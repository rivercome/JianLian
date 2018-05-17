/**
 * Created by out_xu on 17/7/13.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './index.less'
import AutoCarousel from '../Common/AutoCarousel'
import NavBar from '../../components/Common/NavBar'
import { catalogStore, pictureStore, surveyArticleIdsStore } from '../../actions'
import API from '../../api/index'
import fetchPost from '../../utils/request'

class AppLayout extends Component {
  constructor () {
    super()
    this.state = {
      searchContent: '',
      // timeNow: -5,
      /* activeIndex: 0, */
      images: [],
      catalog: []
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.asyncGetCatalogArticle = this.asyncGetCatalogArticle.bind(this)
  }

  componentWillMount () {
    this.asyncGetNavDatas()
    this.asyncGetPictures()
  }

  asyncGetNavDatas = async function () {
    const datas = await fetchPost({
      url: API.getHomeNav,
      method: 'get'
    })
    this.setState({
      catalog: datas.catalog
    })
    this.props.dispatch(catalogStore(datas.catalog))
    datas.catalog[0].nextLvCatalog.map((nav2) => {
      this.asyncGetCatalogArticle(nav2.id)
    })
  }

  asyncGetPictures = async function () {
    const datas = await fetchPost({
      url: API.getPictures,
      method: 'get'
    })
    this.setState({
      images: datas.pictures[1].map(item => item.picture_url)
    })
    this.props.dispatch(pictureStore(datas.pictures))
  }
  asyncGetCatalogArticle = async function (linkId) {
    const datas = await fetchPost({
      url: API.getCatalogArticle + linkId,
      method: 'get'
    })
    // this.props.dispatch(surveyArticleIdsStore(datas.list.data[0].article_id))
  }

  handleSearchChange (e) {
    this.setState({
      searchContent: e.target.value
    })
  }

  handleSubmit () {
    this.setState({
      searchContent: ''
    })
  }

  render () {
    const catalog = this.state.catalog
    const {picture, surveyArticleIds} = this.props
    return (
      <div className='app'>
        <div className='app-header'>
          <div className='app-header-bgImg'>
            {/* <div className={this.position()} /> */}
            {
              picture['1'] ? (
                <AutoCarousel images={picture['1']} time={5000} />
              ) : (
                ''
              )
            }
          </div>
          <div className='app-header-logo'>
            <div className='app-header-logo-img'>
              {/*<img src='/images/QJL_logo.jpg' style={{width: '50px', height: '50px', opacity: '0.5'}} alt=""/>*/}
            </div>
            <div className='app-header-logo-ch'>
              秦皇岛市建筑业联合会
            </div>
            <div className='app-header-logo-en'>
              Qinhuangdao&nbsp;Construction&nbsp;Association
            </div>
          </div>
          <div className='app-header-nav'>
            <div className='app-header-nav-list'>
              <NavBar navDatas={catalog} surveyId={surveyArticleIds}/>
            </div>
            <div className='app-header-nav-search'>
              <input className='app-header-nav-search-input'
                     type='text'
                     onChange={this.handleSearchChange}
                     value={this.state.searchContent}/>
              <div className='app-header-nav-search-font'>
                <a className='nav-font' onClick={this.handleSubmit}>
                  搜索
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='app-content'>
          {this.props.children}
        </div>
        <div className='app-footer'>
          <div className='app-footer-link'>
            <div className='app-footer-link-title'>友情链接:</div>
            <ul className='app-footer-link-list'>
              <li><a href='#'>秦皇岛市市住建委</a></li>
              <li><a href='#'>中国建筑协会</a></li>
              <li><a href='#'>中国施工企业管理协会</a></li>
              <li><a href='#'>中国土木工程学会</a></li>
              <li><a href='#'>秦皇岛市社团办</a></li>
              <li><a href='#'>秦皇岛市社会工委</a></li>
            </ul>
          </div>
          <div className='app-footer-info'>
            <div className='app-footer-info-line1'>
              秦皇岛市市建筑业联合会版权所有&nbsp;&nbsp;&nbsp;
              xxxxxxxxxxxxxxxxx号&nbsp;&nbsp;&nbsp;
              联系电话：(0335)7675616&nbsp;&nbsp;&nbsp;传真：（xxx）xxxxxxxx
            </div>
            <div className='app-footer-info-line2'>
              邮箱：qhdsjzylhh@163.com&nbsp;&nbsp;&nbsp;
              联系地址：秦皇岛市海港区光明路118号&nbsp;&nbsp;&nbsp;
              邮编：066000&nbsp;&nbsp;&nbsp;
              网站建设: 秦皇岛建联
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    picture: state.picture,
    surveyArticleIds: state.surveyArticleIds
  }
}

export default connect(mapStateToProps)(AppLayout)
