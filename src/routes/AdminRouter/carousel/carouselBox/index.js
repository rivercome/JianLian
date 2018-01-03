import React from 'react'
import qiniuConfig, {QINIU_SERVER, QINIU_PATH} from '../../../../config/qiniu.config'
import { Upload, Icon, Modal, message } from 'antd'
import {basePath} from '../../../../config/api'
import axios from 'axios'
import './index.less'

export default class CarouselPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      tokenData: {
        token: null
      }
    }
  }

  componentWillMount () {
    this.getImages()
  }

  getImages () {
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
  }

  getToken (accessKey, secretKey, bucket) {
    return axios.post(`${basePath}/upload`, {
      accessKey,
      secretKey,
      bucket
    }).then(res => {
      this.setState({tokenData: res.data})
    }).catch(data => {
      message.error('获取token出错')
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleChange = (data) => {
    this.setState({ fileList: data.fileList })
    if (data.file.status === 'done') {
      this.syncImgData(data.file.response.hash, data)
    }
  }

  syncImgData (url, data) {
    axios.post(`${basePath}/picture/add`, {
      picture_url: `${QINIU_PATH}/${url}`,
      picture_type: this.props.id
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
  }

  removePicture (data) {
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
  }

  async beforeUpload () {
    await this.getToken(qiniuConfig.ACCESS_KEY, qiniuConfig.SECRET_KEY, qiniuConfig.Bucket_Name)
    return true
  }

  render () {
    const { previewVisible, previewImage, fileList } = this.state
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
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          data={this.state.tokenData}
          onRemove={this.removePicture}
        >
          {fileList.length > 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
