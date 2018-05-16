import React from 'react'
import {Card, Row, Col, message} from 'antd'
import Carousel from './carouselBox'
import axios from 'axios'
import {basePath} from '../../../config/api'
import {QINIU_PATH} from '../../../config/qiniu.config'
import title from './config'
import './index.less'

export default class ArticleView extends React.Component {
  state = {
    pictures: [],
    previewVisible: false,
    previewImage: '',
  }
  componentWillMount () {
    this.getImages()
  }
  getImages () {
    // let urlArr = new Array(6).fill(0).map((item, index) => {
    //   return `${basePath}/picture/lun/show/${index + 1}`
    // })
    // Promise.all(urlArr.map(item => axios.get(item)))
    //   .then(res => {
    //     console.log(res)
    //     const json = (res || []).map((item,index) =>{
    //       return {
    //         pictures: json.item
    //       }
    //     })
    //   })
    axios.get(`${basePath}/pictures/lun/show/`)
      .then(res => {
        if (res.data.code === 1000) {
          let pictures = []
          for (let item in res.data.pictures) {
            pictures[item] = []
            for (let i in res.data.pictures[item]) {
              // let key = Object.keys(res.data.pictures[item][i])[0]
              pictures[item].push({
                uid: res.data.pictures[item][i].id,
                name: 'xxx.png',
                status: 'done',
                id: res.data.pictures[item][i].id,
                link_url: res.data.pictures[item][i].url ,
                type: res.data.pictures[item][i].type,
                url: res.data.pictures[item][i].picture_url
              })
            }
          }
          this.setState({pictures})
        } else {
          message.error('获取信息发生错误')
        }
      })
  }
  syncImgData (url, data, id) {
    axios.post(`${basePath}/picture/lun/add`, {
      picture_url: `${QINIU_PATH}/${url}`,
      type: id,
      url: '#'
    }).then(res => {
      if (res.data.code === 1000) {
        message.success('图片上传成功')
        /* let fileList = this.state.pictures.map((item, index) => {
          if (index === this.state.fileList.length - 1) {
            item.uid = res.data.picture_id
          }
          return item
        })
        this.setState(fileList) */
        this.getImages()
      } else {
        message.error('图片上传失败')
      }
    })
  }
  handleChange = (data, id) => {
    // console.log(data)
    let pictures = [...this.state.pictures]
    pictures[id] = data.fileList
    this.setState({pictures})
    if (data.file.status === 'done') {
      this.syncImgData(data.file.response.hash, data, id)
    }
  }
  removePicture (data) {
    return new Promise((resolve, reject) => {
      axios.get(`${basePath}/picture/lun/delete/${data.uid}`)
        .then(res => {
          if (res.data.code === 1000) {
            message.success('删除成功')
            resolve(true)
          } else if (res.data.code === 1001) {
            message.error('图片不存在')
            reject(new Error('图片不存在'))
          }
        })
    })
  }
  render () {
    return (
      <div className='admin-carousel'>
        <Row gutter={16}>
          {title.map((item, index) => {
            return (
              <Col key={index} xs={{ span: 24 }} lg={{ span: 12 }} className='admin-carousel-box'>
                <Card title={item.title} className='admin-carousel-box-card' hoverable>
                  <Carousel id={item.id} pictures={this.state.pictures[item.id]} handleChange={this.handleChange} removePicture={this.removePicture} />
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
}
