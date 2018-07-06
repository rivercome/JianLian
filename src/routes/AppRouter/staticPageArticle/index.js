import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import HomeMiddleList from '../../../components/AppComponents/HomeMiddleContainer/HomeMiddleList/index'
import './index.less'

import API from '../../../api/index'
import fetchPost from '../../../utils/request'
import { connect } from 'react-redux'

class StaticPageArticle extends Component {
  constructor () {
    super()
    this.state = {
      articleContent: '',
      articleTitle:'',
      articleUpdateTime:'',
      articleCatalog: 0,
      articleFirstCatalog: 0
    }
    this.asyncGetArticle = this.asyncGetArticle.bind(this)
  }

  componentWillMount () {
    this.asyncGetArticle()
  }

  componentWillReceiveProps () {
    this.asyncGetArticle()
  }

  asyncGetArticle = async function () {
    const linkId = location.pathname.slice(20)
    const datas = await fetchPost({
      url: API.getArticle + linkId,
      method: 'get'
    })
    this.setState({
      articleContent: datas.data.article_rendered_content,
      articleTitle: datas.data.article_title,
      articleUpdateTime: datas.data.updated_at || datas.data.created_at,
      articleCatalog: datas.data.article_catalog,
      articleFirstCatalog: datas.data.article_first_catalog
    })
  }

  render () {
    const staticNavLists = [' 工作信息', '党群建设', '枢纽成员']
    const {articleContent, articleTitle, articleUpdateTime, articleCatalog, articleFirstCatalog} = this.state
    const showTime = articleUpdateTime.slice(0,10)
    let catalogTitle1 = ''
    let catalogTitle2 = ''
    let catalogTilte2Array = []
    if (this.props.catalog[0]) {
      const catalogs = this.props.catalog
      catalogs.map((catalog) => {
        if(articleFirstCatalog === catalog.id){
          catalogTitle1 = catalog
          for (let i = 0; i < catalog.nextLvCatalog.length; i++) {
            catalogTilte2Array.push(catalog.nextLvCatalog[i])
          }
          catalog.nextLvCatalog.map((catalog2) => {
            if (catalog2.id === articleCatalog) {
              catalogTitle2 = catalog2
            }
          })
        }
      })
    }
    return (
      <div className='static-article'>
        <div className='static-article-nav'>
          <div className='static-article-nav-top'>
            {catalogTilte2Array[0]?(
              <Link to={'/staticPage/catalog/'+catalogTilte2Array[0].id} style={{color:'#000000'}}>
                <div className='static-article-nav-top-title'>
                  {catalogTitle1.name}
                </div>
              </Link>
            ):('')}
            <div className='static-article-nav-top-list'>
              {catalogTilte2Array.map((c2a, i) => {
                return (
                  <Link to={'/staticPage/catalog/' + c2a.id} key={i}>
                    <div className='static-article-nav-top-list-item'>
                      {c2a.name}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
          {/*<div className='static-article-nav-bottom'>*/}
            {/*<img src='/images/test13.jpg' alt=""/>*/}
          {/*</div>*/}
        </div>
        <div className='static-article-content'>
          <div className='static-article-content-title'>
            <div className='static-article-content-title-font'>{catalogTitle2.name}</div>
            <div className='static-article-content-title-bread'>
              <Link to='/home'>首页</Link>
              <Icon type='double-right'/>
              {catalogTilte2Array[0]?(
                <Link to={'/staticPage/catalog/'+catalogTilte2Array[0].id}>{catalogTitle1.name}</Link>
              ):('')}
              <Icon type='double-right'/>
              <Link to='#'>{catalogTitle2.name}</Link>
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

const mapStateToProps = (state) => {
  return {
    catalog: state.catalog
  }
}

export default connect(mapStateToProps)(StaticPageArticle)