import React from 'react'
import {Card, Form, Input, Button, Icon, message} from 'antd'
import axios from 'axios'
import {basePath} from '../../../config/api'
import './index.less'
const FormItem = Form.Item

class adminUser extends React.Component {
  state = {
    loading: false
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true})
        axios.post(`${basePath}/password/change`, {
          password: values.password,
          newPassword: values.newPassword
        }).then(res => {
          this.setState({loading: false})
          if (res.data.code === 1000) {
            message.success('修改成功')
          } else if (res.data.code === 8003) {
            message.error('密码错误')
          } else {
            message.error('发生错误')
          }
        }).catch(err => {
          this.setState({loading: false})
          throw (new Error(err.message))
        })
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='admin-user'>
        <Card className='admin-user-card' title='修改密码'>
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的旧密码' }]
              })(
                <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='旧密码' />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('newPassword', {
                rules: [{ required: true, message: '请输入你的新密码' }]
              })(
                <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='新密码' />
              )}
            </FormItem>
            <FormItem>
              <Button type='primary' htmlType='submit' className='login-form-button' loading={this.state.loading}>
                修 改
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(adminUser)
