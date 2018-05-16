import React from 'react'
import { Card, Row, Col, Button, Modal, Input, Form, message, Tag, Popover } from 'antd'
import axios from 'axios'
import {basePath} from '../../../../config/api'
import './index.less'
const FormItem = Form.Item

class catalogCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      confirmLoading: false,
      clickClose: true,
      buttonText: '提交',
      firstTitleChanging: false,
      secondTitleChanging: false,
      secondId: null
    }
  }
  componentWillMount () {
  }
  titleData () {
    return (
      <Row gutter={16}>
        <Col span={10}>
          {this.props.catalog.name}
        </Col>
        <Col span={14} style={{textAlign: 'right'}}>
          <Button.Group size='small'>
            <Button type='primary' onClick={() => { this.setState({visible: true, firstTitleChanging: true}) }}>重命名</Button>
            <Button type='danger' onClick={this.removeTitle.bind(this, this.props.catalog.id, 'first')} >删除</Button>
          </Button.Group>
        </Col>
      </Row>
    )
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({confirmLoading: true, buttonText: '正在验证', clickClose: false})
        if (this.state.firstTitleChanging && !this.state.secondTitleChanging) {
          this.changeFirstTitle(values.title, () => {
            this.setState({confirmLoading: false, buttonText: '提交', clickClose: true, visible: false, firstTitleChanging: false})
            this.props.changeFirstTitle(this.props.catalog.id, values.title)
          }, () => {
            this.setState({confirmLoading: false, buttonText: '提交', clickClose: true, firstTitleChanging: false})
          })
        } else if (!this.state.firstTitleChanging && this.state.secondTitleChanging) {
          this.changeSecondTitle(values.title, () => {
            this.setState({confirmLoading: false, buttonText: '提交', clickClose: true, visible: false, secondTitleChanging: false})
            this.props.changeSecondTitle(this.state.secondId, this.props.catalog.id, values.title)
          }, () => {
            this.setState({confirmLoading: false, buttonText: '提交', clickClose: true, secondTitleChanging: false})
          })
        }
      }
    })
  }
  removeTitle (id, type) {
    // console.log(id, type)
    axios.get(`${basePath}/catalog/delete/${id}`)
      .then(res => {
        if (res.data.code === 1000) {
          message.success('删除成功')
          if (type === 'first') {
            this.props.removeFirstTitle(id)
          } else if (type === 'second') {
            this.props.removeSecondTitle(id, this.props.catalog.id)
          }
        } else if (res.data.code === 4002) {
          message.error('该目录不存在')
        }
      })
  }
  changeFirstTitle (newName, successcb, errorcb) {
    this.setState({firstTitleChanging: true})
    axios.post(`${basePath}/catalog/update`, {
      catalog_id: this.props.catalog.id,
      last_catalog_id: 0,
      catalog_lv: 1,
      catalog_name: newName
    }).then(res => {
      this.setState({firstTitleChanging: false})
      if (res.data.code === 1000) {
        message.success('更新成功')
        successcb()
      } else if (res.data.code === 1001) {
        message.error('表单填写有误')
        errorcb()
      }
    })
  }
  changeSecondTitle (newName, successcb, errorcb) {
    this.setState({secondTitleChanging: true})
    axios.post(`${basePath}/catalog/update`, {
      catalog_id: this.state.secondId,
      last_catalog_id: this.props.catalog.id,
      catalog_lv: 2,
      catalog_name: newName
    }).then(res => {
      this.setState({secondTitleChanging: false})
      if (res.data.code === 1000) {
        message.success('更新成功')
        successcb()
      } else if (res.data.code === 1001) {
        message.error('表单填写有误')
        errorcb()
      }
    })
  }
  addSecondTitle (e) {
    this.props.addSecondTitle(e, this.props.catalog.id)
  }
  popoverContent (id) {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Button type='primary' size='small' onClick={() => { this.setState({visible: true, secondTitleChanging: true, secondId: id}) }}>
            重命名
          </Button>
        </Col>
        <Col span={12}>
          <Button type='danger' size='small' onClick={this.removeTitle.bind(this, id, 'second')}>
            删除
          </Button>
        </Col>
      </Row>
    )
  }
  render () {
    const {visible, confirmLoading} = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Card title={this.titleData()} className='admin-catalog-card' hoverable>
        {this.props.catalog.nextLvCatalog.map(item => {
          return (
            <Popover key={item.id} content={this.popoverContent(item.id)} title='选择你要进行的操作'>
              <Tag style={{height: '30px', lineHeight: '30px', marginTop: '10px'}} color='blue'>{item.name}</Tag>
            </Popover>
          )
        })}
        <Tag style={{height: '30px', lineHeight: '30px', marginTop: '10px'}} color='magenta' onClick={this.addSecondTitle.bind(this)}>添加二级目录</Tag>
        <Modal title='重命名' okText={this.state.buttonText} maskClosable={this.state.clickClose} visible={visible} onOk={this.handleSubmit.bind(this)} confirmLoading={confirmLoading} onCancel={() => { this.setState({visible: false, firstTitleChanging: false, secondTitleChanging: false}) }}>
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
      </Card>
    )
  }
}

export default Form.create()(catalogCard)
