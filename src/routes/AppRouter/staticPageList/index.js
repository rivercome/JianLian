import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import HomeMiddleList from '../../../components/AppComponents/HomeMiddleContainer/HomeMiddleList/index'
import './index.less'

import fetchPost from '../../../utils/request'
import API from '../../../api/index'

class StaticPageList extends Component {
  constructor () {
    super()
    this.state = {
      articleList: []
    }
    this.asyncGetCatalogArticle = this.asyncGetCatalogArticle.bind(this)
  }

  componentWillMount () {
    this.asyncGetCatalogArticle()
  }

  componentWillReceiveProps () {
    this.asyncGetCatalogArticle()
  }

  asyncGetCatalogArticle = async function () {
    const linkId = location.pathname.slice(20)
    const datas = await fetchPost({
      url: API.getCatalogArticle + linkId,
      method: 'get'
    })
    await this.setState({
      articleList: (datas.list || {data: []}).data
    })
    return datas
  }

  render () {
    let catalogTitle1 = ''
    let catalogTitle2 = ''
    let catalogTilte2Array = []
    const articleList = this.state.articleList
    if (this.props.catalog[0]) {
      const catalogs = this.props.catalog
      catalogs.map((catalog) => {
        catalog.nextLvCatalog.map((catalog2) => {
          if (articleList[0] && catalog2.id === articleList[0].article_catalog) {
            catalogTitle2 = catalog2
            catalogTitle1 = catalog
            for (let i = 0; i < catalog.nextLvCatalog.length; i++) {
              catalogTilte2Array.push(catalog.nextLvCatalog[i])
            }
          }
        })
      })
    }
    return (
      <div className='static'>
        <div className='static-nav'>
          <div className='static-nav-top'>
            {catalogTilte2Array[0]?(
              <Link to={'/staticPage/catalog/'+catalogTilte2Array[0].id} style={{color:'#000000'}}>
                <div className='static-nav-top-title'>
                  {catalogTitle1.name}
                </div>
              </Link>
            ):('')}
            <div className='static-nav-top-list'>
              {catalogTilte2Array.map((c2a, i) => {
                return (
                  <Link to={'/staticPage/catalog/' + c2a.id} key={i}>
                    <div className='static-nav-top-list-item'>
                      {c2a.name}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
          {/*<div className='static-nav-bottom'>*/}
            {/*<img src='/images/test13.jpg' alt=""/>*/}
          {/*</div>*/}
        </div>
        <div className='static-content'>
          <div className='static-content-title'>
            <div className='static-content-title-font'>{catalogTitle2.name}</div>
            <div className='static-content-title-bread'>
              <Link to='/home'>首页</Link>
              <Icon type='double-right'/>
              {catalogTilte2Array[0]?(
                <Link to={'/staticPage/catalog/'+catalogTilte2Array[0].id}>{catalogTitle1.name}</Link>
              ):('')}
              <Icon type='double-right'/>
              <Link to='#'>{catalogTitle2.name}</Link>
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

const mapStateToProps = (state) => {
  return {
    catalog: state.catalog
  }
}

export default connect(mapStateToProps)(StaticPageList)
