import React from 'react'
import {Card, Form, Input, Button, message} from 'antd'
import {withRouter} from 'react-router-dom'
import BraftEditor from 'braft-editor'
import axios from 'axios'
import querystring from 'query-string'
import qiniuConfig, {QINIU_SERVER, QINIU_PATH} from '../../../../config/qiniu.config'
import {basePath} from '../../../../config/api'
import 'braft-editor/dist/braft.css'
import './index.less'
const FormItem = Form.Item

class ArticleEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      content: null,
      html: null,
      tokenData: {
        token: null
      },
      articleData: {},
      fileLink: ''
    }
  }

  componentDidMount () {
    if (querystring.parse(this.props.location.search).type === 'edit') {
      this.getArticleContent()
    }
  }

  getArticleContent () {
    axios.get(`${basePath}/article/${querystring.parse(this.props.location.search).id}`)
      .then(res => {
        if (res.data.code === 1000) {
          this.setState({articleData: res.data.data})
          this.editorInstance.setContent(JSON.parse(res.data.data.article_real_content))
        } else if (res.data.code === 2002) {
          message.error('文章不存在')
        }
      })
  }

  handleChange = (content) => {
    this.setState({content})
  }

  handleHTMLChange = (html) => {
    this.setState({html})
  }

  getToken (accessKey, secretKey, bucket, fileName) {
    return axios.post(`${basePath}/upload`, {
      accessKey,
      secretKey,
      bucket,
      fileName
    }).then(res => {
      this.setState({tokenData: res.data})
    })
  }

  async upload (param) {
    await this.getToken(qiniuConfig.ACCESS_KEY, qiniuConfig.SECRET_KEY, qiniuConfig.Bucket_Name)
    const serverURL = QINIU_SERVER
    const xhr = new XMLHttpRequest()
    const fd = new FormData()

    // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: `${QINIU_PATH}/${JSON.parse(xhr.responseText).hash}`
      })
    }

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }

    xhr.upload.addEventListener('progress', progressFn, false)
    xhr.addEventListener('load', successFn, false)
    xhr.addEventListener('error', errorFn, false)
    xhr.addEventListener('abort', errorFn, false)

    fd.append('file', param.file)
    fd.append('token', this.state.tokenData.token)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('表单填写有误')
      } else {
        try {
          if (querystring.parse(this.props.location.search).catalog === '' || !querystring.parse(this.props.location.search).catalog) {
            message.error('没有父级目录')
            throw new Error('no catalog')
          }
          let articleRealContent = JSON.stringify(this.state.content)
          if (querystring.parse(this.props.location.search).type === 'add') {
            axios.post(`${basePath}/article/add`, {
              article_title: values.title,
              article_real_content: articleRealContent,
              article_rendered_content: this.state.html,
              article_catalog: querystring.parse(this.props.location.search).catalog,
              article_first_catalog: querystring.parse(this.props.location.search).parentClassId
            }).then(res => {
              if (res.data.code === 1000) {
                this.props.history.go(-1)
                message.success('添加成功')
              } else if (res.data.code === 1001) {
                message.error('表单上传失败')
              } else {
                message.error('发生未知错误')
              }
            }).catch((err) => {
              console.log(err)
            })
          } else {
            let query = querystring.parse(this.props.location.search)
            axios.post(`${basePath}/article/update`, {
              article_id: query.id,
              article_title: values.title,
              article_real_content: articleRealContent,
              article_rendered_content: this.state.html,
              article_catalog: query.catalog,
              article_first_catalog: querystring.parse(this.props.location.search).parentClassId
            }).then(res => {
              if (res.data.code === 1000) {
                message.success('修改成功')
              } else if (res.data.code === 1001) {
                message.error('表单验证出错')
              }
            }).catch(err => {
              message.error(err.message)
            })
          }
        } catch (error) {
          message.error('表单验证发生错误')
        }
      }
    })
  }

  async uploadFile (e) {
    if (this.editorInstance.selectionCollapsed()) {
      return message.error('请选中文本')
    }
    const file = e.target.files[0]
    await this.getToken(qiniuConfig.ACCESS_KEY, qiniuConfig.SECRET_KEY, qiniuConfig.Bucket_Name, file.name)
    const serverURL = QINIU_SERVER
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    fd.append('file', file)
    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      const fileLink = `http://${qiniuConfig.Uptoken_Url}/${JSON.parse(response.currentTarget.response).hash}`
      this.setState({fileLink})
      this.editorInstance.toggleSelectionLink(fileLink, '_blank')
      console.log('成功', fileLink)
    }

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      console.log(event.loaded / event.total * 100)
    }

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      message.error('上传失败')
    }

    xhr.upload.addEventListener('progress', progressFn, false)
    xhr.addEventListener('load', successFn, false)
    xhr.addEventListener('error', errorFn, false)
    xhr.addEventListener('abort', errorFn, false)


    fd.append('token', this.state.tokenData.token)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
    fd.append('file', file)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const editorProps = {
      height: 500,
      initialContent: this.state.content,
      onChange: this.handleChange,
      onHTMLChange: this.handleHTMLChange,
      media: {
        image: true, // 开启图片插入功能
        video: true, // 开启视频插入功能
        audio: true, // 开启音频插入功能
        validateFn: null, // 指定本地校验函数，说明见下文
        uploadFn: this.upload.bind(this), // 指定上传函数，说明见下文
        externalMedias: {
          image: true,
          audio: true,
          video: true,
          embed: true
        }
      },
      extendControls: [
        {
          type: 'split'
        },
        {
          type: 'button',
          text: 'Hello',
          html: "<span>上传附件</span>",
          hoverTitle: 'Hello World!',
          className: 'preview-button',
          onClick: () => {this.fileControl.click()}
        }
      ],
      toggleSelectionLink: {}
    }
    return (
      <div className='article-edit'>
        <input type="file" style={{display: 'none'}} onChange={this.uploadFile.bind(this)} ref={(file) => {this.fileControl = file}} />
        <Card>
          <Form layout='inline' onSubmit={this.handleSubmit.bind(this)} className='article-edit-form'>
            <FormItem
              label='文章标题'
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入文章标题' }],
                initialValue: querystring.parse(this.props.location.search).title || null
              })(
                <Input placeholder='文章标题' />
              )}
            </FormItem>
            <FormItem style={{display: 'float', float: 'right'}}>
              <Button
                type='primary'
                htmlType='submit'
                size='small'
              >
                {querystring.parse(this.props.location.search).type === 'add' ? '上传文章' : '提交修改'}
              </Button>
            </FormItem>
          </Form>
          <h2 className='article-edit-h2'>文章内容</h2>
          <BraftEditor extendAtomics={<div>a</div>} ref={instance => this.editorInstance = instance} {...editorProps} />
        </Card>
      </div>
    )
  }
}

export default Form.create({})(withRouter(ArticleEdit))
