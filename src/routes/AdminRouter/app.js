import React from 'react'
import axios from 'axios'
import {message, Modal, Form, Input} from 'antd'
import event from '../../utils/event'
import {basePath} from '../../config/api'
import { asyncComponent } from 'react-async-component'
import { Route, Switch, withRouter } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout/index'
import AdminIntroducePage from './introduce'
// import AdminCarouselPage from './carousel'
const FormItem = Form.Item
const AdminCarouselPage = asyncComponent({
  resolve: () => System.import('./carousel')
})

const AdminArticlePage = asyncComponent({
  resolve: () => System.import('./article')
})

const AdminCatalogPage = asyncComponent({
  resolve: () => System.import('./catalog')
})

const AdminUserPage = asyncComponent({
  resolve: () => System.import('./user')
})

axios.interceptors.request.use((config) => {
  config.headers['token'] = localStorage.getItem('token') || ''
  config.headers['tokenId'] = localStorage.getItem('id') || 0
  return config
}, function (error) {
  // Do something with request error
  message.error(error.message)
  return Promise.reject(error)
})
axios.interceptors.response.use(function (config) {
  // Do something before request is sent
  if (config.data.code === 6001) {
    event.emit('getToken')
  }
  return config
}, function (error) {
  message.error(error.message)
  return Promise.reject(error)
})

class AdminRouter extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    buttonText: '登录'
  }
  componentWillReceiveProps (nextProps) {
    console.log('a')
    if (nextProps.location.pathname !== this.props.location.pathname && new Date().getTime() > parseInt(localStorage.getItem('time'))) {
      this.checkToken()
    }
  }
  componentWillMount () {
    this.checkToken()
    event.on('getToken', () => {
      this.showModal()
    })
  }
  checkToken () {
    const id = localStorage.getItem('id') || 0
    const token = localStorage.getItem('token') || 'none'
    axios.get(`${basePath}/token/check/${id}/${token}`)
      .then(res => {
        if (res.data.code === 6001) {
          this.showModal()
        }
      })
  }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({confirmLoading: true, buttonText: '正在验证', clickClose: false})
        this.getToken(values.password, (token) => {
          localStorage.setItem('token', token.tokenContent)
          localStorage.setItem('id', token.tokenId)
          let time = new Date().getTime() + 1000 * 60 * 50
          localStorage.setItem('time', time.toString())
          this.setState({confirmLoading: false, buttonText: '提交', clickClose: true, visible: false})
        }, () => {
          this.setState({confirmLoading: false, buttonText: '提交', clickClose: true})
        })
      }
    })
  }
  getToken (password, successcb, errorcb) {
    axios.post(`${basePath}/token/create`, {
      password
    }).then(res => {
      if (res.data.code === 1000) {
        message.success('登录成功')
        successcb(res.data.token)
      } else {
        message.error('密码错误')
        errorcb()
      }
    })
  }
  handleCancle () {
    this.setState({visible: false})
    this.props.history.push('/')
  }
  render () {
    const { visible, confirmLoading, buttonText } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <AdminLayout>
        <Switch>
          <Route exact path='/admin' component={AdminIntroducePage} />
          <Route exact path='/admin/carousel' component={AdminCarouselPage} />
          <Route path='/admin/article' component={AdminArticlePage} />
          <Route path='/admin/catalog' component={AdminCatalogPage} />
          <Route path='/admin/user' component={AdminUserPage} />
        </Switch>
        <Modal title='登录状态失效，请输入密码' okText={buttonText} maskClosable={false} visible={visible} onOk={this.handleSubmit.bind(this)} confirmLoading={confirmLoading} onCancel={this.handleCancle.bind(this)}>
          <Form layout='inline'>
            <FormItem
              label='密码'
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入有效密码'
                }]
              })(
                <Input type='password' />
              )}
            </FormItem>
          </Form>
        </Modal>
      </AdminLayout>
    )
  }
}

export default Form.create()(withRouter(AdminRouter))
