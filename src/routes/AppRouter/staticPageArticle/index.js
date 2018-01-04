import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import HomeMiddleList from '../../../components/AppComponents/HomeMiddleContainer/HomeMiddleList/index'
import './index.less'

import API from '../../../api/index'
import fetchPost from '../../../utils/request'

class StaticPageArticle extends Component {
  constructor () {
    super()
    this.state = {
      articleContent: '',
      articleTitle:'',
      articleUpdateTime:''
    }
    this.asyncGetArticle = this.asyncGetArticle.bind(this)
  }

  componentWillMount () {
    this.asyncGetArticle()
  }

  asyncGetArticle = async function () {
    const datas = await fetchPost({
      url: API.getArticle + this.props.match.params.id,
      method: 'get'
    })
    console.log(datas)
    this.setState({
      articleContent: datas.data.article_rendered_content,
      articleTitle: datas.data.article_title,
      articleUpdateTime: datas.data.updated_at || datas.data.created_at
    })
  }

  render () {
    const staticNavLists = [' 工作信息', '党群建设', '枢纽成员']
    const {articleContent, articleTitle, articleUpdateTime} = this.state
    const showTime = articleUpdateTime.slice(0,10)
    return (
      <div className='static-article'>
        <div className='static-article-nav'>
          <div className='static-article-nav-top'>
            <div className='static-article-nav-top-title'>
              枢纽园地
            </div>
            <div className='static-article-nav-top-list'>
              {staticNavLists.map((staticNavList, i) => {
                return (
                  <div className='static-article-nav-top-list-item' key={i}>{staticNavList}</div>
                )
              })}
            </div>
          </div>
          <div className='static-article-nav-bottom'>
            <img src='/images/test13.jpg' alt=""/>
          </div>
        </div>
        <div className='static-article-content'>
          <div className='static-article-content-title'>
            <div className='static-article-content-title-font'>经验交流</div>
            <div className='static-article-content-title-bread'>
              <Link to='/home'>首页</Link>
              <Icon type='double-right'/>
              <Link to='#'>工程管理</Link>
              <Icon type='double-right'/>
              <Link to='#'>经验交流</Link>
            </div>
          </div>
          <div className='static-article-content-font'>
            <div className='static-article-content-font-title'>
              {articleTitle}
            </div>
            <div className='static-article-content-font-time'>
              时间：{showTime}
            </div>
            <div dangerouslySetInnerHTML={{__html:articleContent}}/>
          </div>
        </div>
        <div style={{clear: 'both'}}/>
      </div>
    )
  }
}

export default StaticPageArticle
