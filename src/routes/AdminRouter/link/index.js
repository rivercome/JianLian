import React,{ Component } from 'react'
import {Input, Select, Button} from 'antd'
import axios from 'axios'
import api from '../../../config/api'
import './index.less'

const Option = Select.Option;
const children = [1,2,3,4,5,6]


class AdminLink extends Component {
  constructor (props){
    super()
    this.state= {
      title: '',
      link: '',
      position: '',
    }
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange1 (e) {
    this.setState({
      title: e.target.value
    },() => {
      console.log(this.state.title)
    })

  }
  handleChange2 (e) {
    this.setState({
      link: e.target.value
    }, () => {
      console.log(this.state.link)
    })

  }

 handleChange(value) {
    this.setState({
      position: value
    },() => {
      console.log(this.state.position)
    })
  }
  handleSubmit() {
    console.log('link', this.state)
    axios({
      url: `${api.basePath}/friendurl/add `,
      method: 'POST',
      data: {
        title: this.state.title,
        url: this.state.link,
        position: this.state.position,
      }
    }).then( res => {
      console.log('res', res.data.data)
    })

  }

  render() {
    return (
      <div>
        <div className='link-title'>
          友情链接
        </div>
        <div className='link-content'>
          <div className='each-content'>
            <Input addonBefore="链接名称" defaultValue="输入链接名" width='70%' className='link-input'
                   onChange={(e) => this.handleChange1(e)}
            />
            <br />
            <br />

            <Input addonBefore="链接地址" defaultValue="输入链接地址" width='70%'
                   onChange={(e) => this.handleChange2(e)}
            />
            <br />
            <br />
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择链接位置"
              optionFilterProp="children"
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
            </Select>
          </div>
          <br />
          <br />
          <Button onClick={this.handleSubmit}>提交</Button>
        </div>
      </div>
    )
  }
}

export default AdminLink