import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './index.less'
import { Carousel } from 'antd';
import AutoCarousel from '../Common/AutoCarousel'
import NavBar from '../../components/Common/NavBar'
import { catalogStore, pictureStore, surveyArticleIdsStore, SearchAticle } from '../../actions'
import API from '../../api/index'
import fetchPost from '../../utils/request'

class AppLayout extends Component {
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
    const data = await fetchPost({
      url: API.getCatalogArticle + linkId,
      method: 'get'
    })
    console.log(data)
    if (data.list) {
      this.props.dispatch(surveyArticleIdsStore(data.list.data[0].article_id))
    } else {
      this.props.dispatch(surveyArticleIdsStore(linkId))
    }
  }

  constructor () {
    super()
    this.state = {
      searchContent: 'aa',
      // timeNow: -5,
      /* activeIndex: 0, */
      article_id: '',
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

  handleSearchChange (e) {
    this.setState({
      searchContent: e.target.value
    })
  }

  handleSubmit () {
    const title = this.state.searchContent
    fetch(`http://build.sealbaby.cn/article/search/${title}`)
      .then(res => {
        return res.json()
      }).then(json => {
      const data = json.data.data.map((item, index) => {
        return {
          article_id :item.article_id,
          article_title: item.article_title
        }
      })
      this.props.dispatch(SearchAticle(data))

    })
    this.setState({
      searchContent: ''
    })
  }

  render () {
    const catalog = this.state.catalog
    const {picture, surveyArticleIds, article_id} = this.props
    console.log('picture', picture['1'])
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
              <NavBar navDatas={catalog} surveyId={surveyArticleIds} />
            </div>
            <div className='app-header-nav-search'>
              <input className='app-header-nav-search-input'
                     type='text'
                     onChange={this.handleSearchChange}
              />
              <div className='app-header-nav-search-font'>
                <Link to='/async' className='nav-font' onClick={this.handleSubmit}>
                  搜索
                </Link>
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
              秦皇岛市建筑业联合会版权所有&nbsp;&nbsp;&nbsp;
              冀ICP备18012990号&nbsp;&nbsp;&nbsp;
              联系电话：(0335)7675616&nbsp;&nbsp;&nbsp;
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
    surveyArticleIds: state.surveyArticleIds,
    article_id: state.article_id
  }
}

export default connect(mapStateToProps)(AppLayout)