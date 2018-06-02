import React,{ Component } from 'react'
import {Input, Select, Icon, Button } from 'antd'
import './index.less'
const Option = Select.Option;

class AdminLink extends Component {
  constructor (props){
    super()
    this.state={
      Content: [{
        content: '',
        link: ''
      },{
        content: '',
        link: ''
      },{
        content: '',
        link: ''
      },{
        content: '',
        link: ''
      },{
        content: '',
        link: ''
      },{
        content: '',
        link: ''
      }]
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    console.log(e)
    this.setState({
      Content: e.target.value
    })
    console.log(this.state.Content)
  }
  render() {
    return (
      <div>
        <div className='link-title'>
          友情链接
        </div>
        <div className='link-content'>
          <div className='each-content'>
            <span style={{display: 'block'}}>第一个</span>
            <Input addonBefore="链接名" defaultValue="输入链接名" width='70%' className='link-input'
                   onChange={(e) => this.handleChange(e)}
            />
            <Input addonBefore="链接地址" defaultValue="输入链接地址" width='70%'
                   onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className='each-content'>
            <span style={{display: 'block'}}>第二个</span>
            <Input addonBefore="链接名" defaultValue="输入链接名" width='70%'
                   onChange={(e) => this.handleChange(e).bind}
            />
            <br />
            <Input addonBefore="链接地址" defaultValue="输入链接地址" width='70%' />
          </div>

          <Button>提交</Button>
        </div>
      </div>
    )
  }
}

export default AdminLink