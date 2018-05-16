import React from 'react'
import qiniuConfig, { QINIU_SERVER } from '../../../../config/qiniu.config'
import { Upload, Icon, Modal, message, Input, Button } from 'antd'
import {basePath} from '../../../../config/api'
import axios from 'axios'
import './index.less'

export default class CarouselPage extends React.Component {
    /* getImages () {
    axios.get(`${basePath}/picture/show`)
      .then(res => {
        let fileList = []
        for (let i in res.data.picture[this.props.id]) {
          fileList.push({
            uid: i,
            name: 'xxx.png',
            state: 'done',
            url: res.data.picture[this.props.id][i]
          })
        }
        this.setState({fileList})
      })
  } */

  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      linkUrl: '',
      pictureId: '',
      previewImage: '',
      pictureLink: '',
      pictures: [],
      tokenData: {
        token: null
      }
    }
    this.handleUrl = this.handleUrl.bind(this)
  }
  handleCancel = () => this.setState({previewVisible: false})
  handlePreview = (file) => {
    // console.log(file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
      linkUrl: file.link_url === '#' ? '' : file.link_url,
      pictureId: file.id
    })
  }
  componentWillMount () {
  }

  getToken (accessKey, secretKey, bucket) {
    return axios.post(`${basePath}/upload`, {
      accessKey,
      secretKey,
      bucket
    }).then(res => {
      this.setState({tokenData: res.data})
    }).catch(() => {
      message.error('获取token出错')
    })
  }

  handleUrl (e) {
    const pictureId = this.state.pictureId
    const picture = this.props.pictures.filter(item => item.uid === this.state.pictureId)[0]
    if (picture.id === void 0) {
      return message.error('发生错误')
    }
    const config = {
      method: 'post',
      url: `${basePath}/picture/lun/${pictureId}`,
      headers: {'Content-Type': 'application/json'},
      data: {
        url: this.state.linkUrl,
        type: picture.type,
        picture_url: picture.url
      }
    }
    axios(config)
      .then(res => {
        message.success("保存成功")
      })
  }

  /* handleChange = (data) => {
    this.setState({ fileList: data.fileList })
    if (data.file.status === 'done') {
      this.props.syncImgData(data.file.response.hash, data, this.props.id)
    }
  } */

  /* syncImgData (url, data, id) {
    axios.post(`${basePath}/picture/add`, {
      picture_url: `${QINIU_PATH}/${url}`,
      picture_type: id
    }).then(res => {
      if (res.data.code === 1000) {
        message.success('图片上传成功')
        let fileList = this.state.fileList.map((item, index) => {
          if (index === this.state.fileList.length - 1) {
            item.uid = res.data.picture_id
          }
          return item
        })
        this.setState(fileList)
      } else {
        message.error('图片上传失败')
      }
    })
  } */

  /* removePicture (data) {
    return new Promise((resolve, reject) => {
      axios.get(`${basePath}/picture/delete/${data.uid}`)
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
  } */

  async beforeUpload () {
    await this.getToken(qiniuConfig.ACCESS_KEY, qiniuConfig.SECRET_KEY, qiniuConfig.Bucket_Name)
    return true
  }

  render () {
    const {previewVisible, previewImage} = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    return (
      <div className='clearfix'>
        <Upload
          action={QINIU_SERVER}
          beforeUpload={this.beforeUpload.bind(this)}
          listType='picture-card'
          fileList={this.props.pictures}
          onPreview={this.handlePreview}
          onChange={(e) => { this.props.handleChange(e, this.props.id) }}
          data={this.state.tokenData}
          onRemove={this.props.removePicture}
        >
          {this.props.pictures && (this.props.pictures.length > 5) ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <Input key={this.state.id} onChange={(e) => { this.setState({linkUrl: e.target.value}) }} value={this.state.linkUrl} addonBefore='输入图片链接' style={{width: '80%', float: 'left'}} /><Button
          onClick={this.handleUrl}>保存</Button>
          <img alt='example' style={{width: '100%'}} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
