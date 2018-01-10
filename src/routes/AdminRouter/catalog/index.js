import React from 'react'
import axios from 'axios'
import {basePath} from '../../../config/api'
import {message, Row, Col, Card, Modal, Form, Input} from 'antd'
import CatalogCard from './catalogCard'
import './index.less'
const FormItem = Form.Item

class Catalog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      catalogData: [],
      visible: false,
      confirmLoading: false,
      buttonText: '提交',
      clickClose: true,
      addTitle: '新建一级目录',
      addSecondTitlePId: false
    }
  }
  componentWillMount () {
    this.getArticleData()
  }
  async getArticleData () {
    axios.get(`${basePath}/catalog/show`)
     .then(res => {
       if (res.data.code === 1000) {
         this.setState({catalogData: res.data.catalog})
       } else {
         message.error('获取文章信息出错')
       }
     })
  }
  changeFirstTitle (id, name) {
    let catalogData = this.state.catalogData.map(catalog => {
      if (catalog.id === id) {
        catalog.name = name
      }
      return catalog
    })
    this.setState({catalogData})
  }
  changeSecondTitle (id, parentId, name) {
    let catalogData = this.state.catalogData.map(catalog => {
      if (catalog.id === parentId) {
        catalog.nextLvCatalog.map(child => {
          if (child.id === id) {
            child.name = name
          }
        })
      }
      return catalog
    })
    this.setState({catalogData})
  }
  removeFirstTitle (id) {
    let catalogData = this.state.catalogData.filter(catalog => {
      return catalog.id !== id
    })
    this.setState({catalogData})
  }
  removeSecondTitle (id, parentId) {
    let catalogData = this.state.catalogData.map(catalog => {
      if (catalog.id === parentId) {
        catalog.nextLvCatalog = catalog.nextLvCatalog.filter(item => {
          return item.id !== id
        })
      }
      return catalog
    })
    this.setState({catalogData})
  }
  handleSubmit (e, parentId) {
    e.preventDefault()
    if (!this.state.addSecondTitlePId) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.setState({confirmLoading: true, buttonText: '正在验证', clickClose: false})
          this.addFirstTitle(values.title, () => {
            this.setState({confirmLoading: false, buttonText: '提交', clickClose: true, visible: false})
            this.getArticleData()
          }, () => {
            this.setState({confirmLoading: false, buttonText: '提交', clickClose: true})
          })
        }
      })
    } else {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.setState({confirmLoading: true, buttonText: '正在验证', clickClose: false})
          this.doAddSecondTitle(values.title, () => {
            this.setState({confirmLoading: false, buttonText: '提交', clickClose: true, visible: false})
            this.getArticleData()
          }, () => {
            this.setState({confirmLoading: false, buttonText: '提交', clickClose: true})
          })
        }
      })
    }
  }
  doAddSecondTitle (name, successcb, errorcb) {
    axios.post(`${basePath}/catalog/add`, {
      last_catalog_id: this.state.addSecondTitlePId,
      catalog_lv: 2,
      catalog_name: name
    }).then(res => {
      if (res.data.code === 1000) {
        message.success('添加成功')
        successcb()
      } else if (res.data.code === 1001) {
        message.error('添加失败')
        errorcb()
      }
    })
  }
  addFirstTitle (newName, successcb, errorcb) {
    axios.post(`${basePath}/catalog/add`, {
      last_catalog_id: 0,
      catalog_lv: 1,
      catalog_name: newName
    }).then(res => {
      if (res.data.code === 1000) {
        message.success('更新成功')
        successcb()
      } else if (res.data.code === 1001) {
        message.error('表单填写有误')
        errorcb()
      }
    })
  }
  addSecondTitle (e, addSecondTitlePId) {
    this.setState({addSecondTitlePId, visible: true, addTitle: '新建二级目录'})
  }
  render () {
    const {visible, confirmLoading} = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Row gutter={16} className='admin-catalog'>
        {this.state.catalogData.map(catalog => {
          return (
            <Col className='admin-catalog-cardbox' key={catalog.id} xs={{span: 24}} md={{span: 12}} xl={{span: 8}}>
              <CatalogCard catalog={catalog} addSecondTitle={this.addSecondTitle.bind(this)} removeSecondTitle={this.removeSecondTitle.bind(this)} changeSecondTitle={this.changeSecondTitle.bind(this)} changeFirstTitle={this.changeFirstTitle.bind(this)} removeFirstTitle={this.removeFirstTitle.bind(this)} />
            </Col>
          )
        })}
        <Col className='admin-catalog-cardbox' xs={{span: 24}} md={{span: 12}} xl={{span: 8}}>
          <Card className='admin-catalog-cardbox-add' hoverable title='添加一级目录'>
            <i onClick={() => { this.setState({visible: true}) }} className='iconfont icon-tianjiajiahaowubiankuang admin-catalog-cardbox-add-icon' />
          </Card>
        </Col>
        <Modal title={this.state.addTitle} okText={this.state.buttonText} maskClosable={this.state.clickClose} visible={visible} onOk={this.handleSubmit.bind(this)} confirmLoading={confirmLoading} onCancel={() => { this.setState({visible: false, addSecondTitlePId: false}) }}>
          <Form layout='inline'>
            <FormItem
              label='标题'
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入标题名称'
                }]
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      </Row>
    )
  }
}

export default Form.create()(Catalog)
