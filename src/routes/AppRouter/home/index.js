import React, { Component } from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import AutoCarousel from '../../../components/Common/AutoCarousel'
import NoneAutoCarousel from '../../../components/AppComponents/NoneAutoCarousel/index'
import HomeMiddleContainer from '../../../components/AppComponents/HomeMiddleContainer/index'
import HomeMiddleList from '../../../components/AppComponents/HomeMiddleContainer/HomeMiddleList'
import HomePictureContainer from '../../../components/AppComponents/HomePictureContainer/index'
import './index.less'

import API from '../../../api/index'
import fetchPost from '../../../utils/request'
import { connect } from 'react-redux'
import { catalogStore } from '../../../actions'

class AppHomePage extends Component {
  constructor () {
    super()
    this.state = {
      homeList: '',
      images: []
    }
    this.asyncGetHomeList = this.asyncGetHomeList.bind(this)
  }

  componentWillMount () {
    this.asyncGetHomeList()
  }

  asyncGetHomeList = async function () {
    const datas = await fetchPost({
      url: API.getHomeList,
      method: 'get'
    })
    this.setState({
      homeList: datas.articleList
    })
  }

  render () {
    const images2 = ['/images/test11.jpg', '/images/test12.jpg', '/images/test13.jpg']
    const images11 = [
      '/images/test11.jpg',
      '/images/test12.jpg',
      '/images/test13.jpg',
      '/images/test14.jpg',
      '/images/test11.jpg',
      '/images/test12.jpg',
      '/images/test13.jpg',
      '/images/test14.jpg'
    ]
    const images12 = [
      '/images/test12.jpg',
      '/images/test11.jpg',
      '/images/test14.jpg',
      '/images/test13.jpg',
      '/images/test12.jpg',
      '/images/test11.jpg',
      '/images/test14.jpg',
      '/images/test13.jpg',
    ]
    const images13 = [
      '/images/test13.jpg',
      '/images/test14.jpg',
      '/images/test11.jpg',
      '/images/test12.jpg',
      '/images/test13.jpg',
      '/images/test14.jpg',
      '/images/test11.jpg',
      '/images/test12.jpg',
    ]
    const lists=[
      {"article_id":14,"article_title":"a","created_at":"2018-01-03 09:32:08"},
      {"article_id":13,"article_title":"aa","created_at":"2018-01-03 09:29:54"}]
    let homeList = []
    if (this.state.homeList) {
      homeList = this.state.homeList
    } else {
      homeList = []
    }
    const {picture, catalog} = this.props
    if(catalog){
      console.log('catalog=',catalog)
    }
    if(homeList){
      console.log('homeList',this.state.homeList)
    }
    let nav2array=[]
    homeList.map((home)=>{
      catalog.map((cat)=>{
        if(home.catalog_id===cat.id && cat.nextLvCatalog[0]){
          nav2array.push(cat.nextLvCatalog[0].id)
        }
      })
    })
    return (
      <div className='app-home'>
        <div id='td-code-left' className='td-code'>
          <div className='td-code-img'>
            <img src='/images/tdCode.jpg' alt=""/>
          </div>
          <div className='td-code-font'>
            微信公众号<br/>
            欢迎关注
          </div>
        </div>
        <div id='td-code-right' className='td-code'>
          <div className='td-code-img'>
            <img src='/images/tdCode.jpg' alt=""/>
          </div>
          <div className='td-code-font'>
            微信公众号<br/>
            欢迎关注
          </div>
        </div>
        <div className='app-home-top'>
          <div className='app-home-top-a'>
            {
              picture['2'] ? (
                <AutoCarousel images={picture['2']} time={5000}/>
              ) : (
                ''
              )
            }
          </div>
          <div className='app-home-top-b'>
            <div className='app-home-top-b-top'>
              <div className='app-home-top-b-top-title'>
                {homeList[1] ? (
                  <Link
                    className='app-home-top-b-top-title-link'
                    to={'/staticPage/catalog/' + nav2array[1]}>
                    {homeList[1].catalog_name}
                  </Link>
                ) : ('暂无数据')}
              </div>
              <div className='app-home-top-b-top-more'>
                {homeList[1] ? (
                  <Link
                    style={{textDecoration:'none',color:'#ffffff'}}
                    to={'/staticPage/catalog/' + nav2array[1]}>
                    <Icon type='double-right'/>更多
                  </Link>
                ) : (
                  <Link style={{textDecoration:'none',color:'#ffffff'}} to='#'>
                    <Icon type='double-right'/>更多
                  </Link>
                )}
              </div>
            </div>
            {homeList[0] ? (
              <HomeMiddleList listInfo={homeList[1].article_list} showNum={8}/>
            ) : (
              <div className='app-home-middle-none-content'>
                暂无数据
              </div>
            )}
          </div>
          <div className='app-home-top-c'>
            <div className='title-right'>
              <Link className='app-home-top-b-top-title-link' to='/staticPage'>网上申报</Link>
            </div>
            <div className='app-home-top-c-content'>
              {images2.map((image, i) => {
                return (
                  <div key={i} className='app-home-top-c-content-img'><img src={image} alt=""/></div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='app-home-middle1'>
          <div className='app-home-middle1-a'>
            <img src='/images/test.jpg' alt=''/>
          </div>
          <div className='app-home-middle1-b'>
            <div className='title-right'>
              <Link className='app-home-top-b-top-title-link' to='/staticPage'>会员资讯</Link>
            </div>
            <div className='app-home-middle1-b-content'>
              <div className='app-home-middle1-b-content-font'>
                <Link to='#' style={{textDecoration: 'none'}}><Icon type='right-circle'/>&nbsp;会员单位</Link>
              </div>
              <div className='app-home-middle1-b-content-font'>
                <Link to='#' style={{textDecoration: 'none'}}><Icon type='right-circle'/>&nbsp;入会须知</Link>
              </div>
            </div>
          </div>
        </div>
        <div className='app-home-middle2'>
          {homeList[6] ? (
            <HomeMiddleContainer
              title1={homeList[2].catalog_name}
              title1Id={nav2array[2]}
              title2={homeList[6].catalog_name}
              title2Id={nav2array[6]}
              list1Info={homeList[2].article_list}
              list2Info={homeList[6].article_list}
              showNum={7}/>
          ) : (
            <div className='app-home-middle-none'>
              <div className='app-home-middle-none-title'/>
              <div className='app-home-middle-none-content'>
                暂无数据
              </div>
            </div>
          )}
          {homeList[4] ? (
            <HomeMiddleContainer
              title1={homeList[4].catalog_name}
              title2={homeList[3].catalog_name}
              title1Id={nav2array[4]}
              title2Id={nav2array[3]}
              list1Info={homeList[4].article_list}
              list2Info={homeList[3].article_list}
              showNum={7}/>
          ) : (
            <div className='app-home-middle-none'>
              <div className='app-home-middle-none-title'/>
              <div className='app-home-middle-none-content'>
                暂无数据
              </div>
            </div>
          )}
          <div className='app-home-middle2-c'>
            <div className='title-right'>
              {homeList[6] ? (
                <Link className='app-home-top-b-top-title-link' to={'/staticPage/' + homeList[5].catalog_id}>
                  {/*{homeList[5].catalog_name}*/}
                  材料信息
                </Link>
              ) : ('暂无数据')}
            </div>
            {homeList[12] ? (
              <HomeMiddleList listInfo={homeList[5].article_list} showNum={8}/>
            ) : (
              <div className='app-home-middle-none-content'>
                暂无数据
              </div>
            )}
          </div>
        </div>
        <div className='app-home-middle3'>
          {/*<div className='title-right'>*/}
            {/*优秀建筑展示*/}
          {/*</div>*/}
          <HomePictureContainer
            title1='优秀建筑展示'
            title2='行业风采'
            title3='行业精英'
            images1={images11}
            images2={images12}
            images3={images13}/>
        </div>
        <div className='app-home-middle2'>
          {homeList[5] ? (
            <HomeMiddleContainer
              title1={homeList[5].catalog_name}
              title2={homeList[7].catalog_name}
              title1Id={nav2array[5]}
              title2Id={nav2array[7]}
              list1Info={homeList[5].article_list}
              list2Info={homeList[7].article_list}
              showNum={7}/>
          ) : (
            <div className='app-home-middle-none'>
              <div className='app-home-middle-none-title'/>
              <div className='app-home-middle-none-content'>
                暂无数据
              </div>
            </div>
          )}
          {homeList[10] ? (
            <HomeMiddleContainer
              title1={homeList[8].catalog_name}
              title2={homeList[11].catalog_name}
              title1Id={nav2array[8]}
              title2Id={nav2array[11]}
              list1Info={homeList[8].article_list}
              list2Info={homeList[11].article_list}
              showNum={7}/>
          ) : (
            <div className='app-home-middle-none'>
              <div className='app-home-middle-none-title'/>
              <div className='app-home-middle-none-content'>
                暂无数据
              </div>
            </div>
          )}
          <div className='app-home-middle2-c'>
            <div className='title-right'>
              <Link className='app-home-top-b-top-title-link' to='/staticPage'>
                新型材料及产品展示
              </Link>
            </div>
            <div className='app-home-middle2-c-content'>
              <NoneAutoCarousel images={images2}/>
              <div className='app-home-middle2-c-content-list'>
                <HomeMiddleList showNum={2} listInfo={lists}/>
              </div>
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
    catalog: state.catalog
  }
}

export default connect(mapStateToProps)(AppHomePage)
