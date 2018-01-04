import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Icon} from 'antd'
import HomeMiddleList from '../../../components/AppComponents/HomeMiddleContainer/HomeMiddleList/index'
import './index.less'

import fetchPost from '../../../utils/request'
import API from '../../../api/index'

class StaticPageList extends Component {
  constructor (){
    super()
    this.state={
      articleList:[]
    }
    this.asyncGetCatalogArticle = this.asyncGetCatalogArticle.bind(this)
  }

  componentWillMount(){

  }

  componentWillReceiveProps(){
    this.asyncGetCatalogArticle()
    console.log(1)
  }

  asyncGetCatalogArticle=async function(){
    console.log(API.getCatalogArticle + this.props.match.params.id)
    const datas = await fetchPost({
      url:API.getCatalogArticle+this.props.match.params.id,
      method:'get'
    })
    console.log('cataloglist',datas.list.data)
    this.setState({
      articleList:datas.list.data
    })
  }

  render () {
    const staticNavLists = [' 工作信息', '党群建设', '枢纽成员']
    const articleList = this.state.articleList
    console.log('al',articleList)
    return (
      <div className='static'>
        <div className='static-nav'>
          <div className='static-nav-top'>
            <div className='static-nav-top-title'>
              枢纽园地
            </div>
            <div className='static-nav-top-list'>
              {staticNavLists.map((staticNavList, i) => {
                return (
                  <div className='static-nav-top-list-item' key={i}>{staticNavList}</div>
                )
              })}
            </div>
          </div>
          <div className='static-nav-bottom'>
            <img src='/images/test13.jpg' alt=""/>
          </div>
        </div>
        <div className='static-content'>
          <div className='static-content-title'>
            <div className='static-content-title-font'>经验交流</div>
            <div className='static-content-title-bread'>
              <Link to='/home'>首页</Link>
              <Icon type='double-right'/>
              <Link to='#'>工程管理</Link>
              <Icon type='double-right'/>
              <Link to='#'>经验交流</Link>
            </div>
          </div>
          <div className='static-content-list'>
            {articleList.length ? (
              <HomeMiddleList listInfo={articleList} showNum={8}/>
            ) : (
              <div className='app-home-middle-none-content'>
                暂无数据
              </div>
            )}
          </div>
        </div>
        <div style={{clear: 'both'}}/>
      </div>
    )
  }
}

export default StaticPageList
