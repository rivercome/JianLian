import React from 'react'
import { Table, Divider, Card, Row, Col, Button, message } from 'antd'
import querystring from 'query-string'
import axios from 'axios'
import {basePath} from '../../../../config/api'
import {Link} from 'react-router-dom'
import './index.less'

export default class ArticleView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      columns: [{
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a href='#'>{text}</a>
      }, {
        title: '发布时间',
        dataIndex: 'time',
        key: 'time',
        sorter: (a, b) => new Date(a.time) - new Date(b.time),
        width: 200
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <a href={`/admin/article/edit?id=${text.key}&title=${text.title}&catalog=${text.classId}&type=edit&parentClassId=${querystring.parse(this.props.location.search).parentClassId}`}>编辑</a>
              <Divider type='vertical' />
              <a onClick={this.removeArticle.bind(this, text.key)}>删除</a>
            </span>
          )
        },
        width: 120
      }],
      loading: true,
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10
      }
    }
  }

  componentWillMount () {
    this.getArtical(querystring.parse(this.props.location.search).classId)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.getArtical(querystring.parse(nextProps.location.search).classId)
    }
  }

  removeArticle (id) {
    console.log(id)
    axios.get(`${basePath}/article/delete/${id}`)
      .then(res => {
        if (res.data.code === 1000) {
          message.success('删除成功')
          this.getArtical(querystring.parse(this.props.location.search).classId, this.state.pagination.current)
        } else if (res.data.code === 2002) {
          message.error('删除失败, 文章不存在')
        } else {
          message.error('发生未知错误')
        }
      })
  }

  getArtical (id, page = 1) {
    this.setState({loading: true})
    axios.get(`${basePath}/article/list/${id}?page=${page}`)
      .then(res => {
        this.setState({loading: false})
        if (res.data.code === 1000) {
          let articleArr = res.data.list.data.map(data => {
            return {
              title: data.article_title,
              time: data.created_at,
              id: data.article_id,
              classId: data.article_catalog,
              key: data.article_id
            }
          })
          let pagination = {...this.state.pagination, pageSize: res.data.list.per_page, total: res.data.list.total, current: res.data.list.current_page}
          this.setState({pagination, data: articleArr})
        } else if (res.data.code === 3002) {
          this.setState({pagination: {}, data: []})
          message.info('该类别无文章')
        }
      })
  }

  changePage (page, pageSize) {
    this.getArtical(querystring.parse(this.props.location.search).classId, page.current)
  }

  titleData () {
    let query = querystring.parse(this.props.location.search)
    return (
      <Row gutter={16}>
        <Col span={12}>
          {`${query.parentClassName} / ${query.className}`}
        </Col>
        <Col span={12} style={{textAlign: 'right'}}>
          <Button type='primary' size='small'><Link to={`/admin/article/edit/?catalog=${query.classId}&type=add&parentClassId=${query.parentClassId}`}>添加文章</Link></Button>
        </Col>
      </Row>
    )
  }
  render () {
    return (
      <div className='admin-article-view' key={this.props.location.search}>
        <Card >
          <Table onChange={this.changePage.bind(this)} pagination={this.state.pagination} loading={this.state.loading} title={this.titleData.bind(this)} bordered columns={this.state.columns} dataSource={this.state.data} />
        </Card>
      </div>
    )
  }
}
