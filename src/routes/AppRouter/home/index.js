import React, { Component } from 'react'
import { Icon, Carousel } from 'antd'
import { Link } from 'react-router-dom'
import AutoCarousel from '../../../components/Common/AutoCarousel'
import NoneAutoCarousel from '../../../components/AppComponents/NoneAutoCarousel/index'
import HomeMiddleContainer from '../../../components/AppComponents/HomeMiddleContainer/index'
import HomeMiddleList from '../../../components/AppComponents/HomeMiddleContainer/HomeMiddleList'
import './index.less'

import API from '../../../api/index'
import fetchPost from '../../../utils/request'

class AppHomePage extends Component {
  constructor () {
    super()
    this.state = {
      homeList: ''
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
    console.log(datas)
    this.setState({
      homeList: datas.articleList
    })
  }

  render () {
    const images2 = ['/images/test11.jpg', '/images/test12.jpg', '/images/test13.jpg']
    const images3 = [
      '/images/test11.jpg',
      '/images/test12.jpg',
      '/images/test13.jpg',
      '/images/test14.jpg',
      '/images/test11.jpg',
      '/images/test12.jpg',
      '/images/test13.jpg',
      '/images/test14.jpg'
    ]
    const m1 = {
      mtitle1: {content: '协会动态', id: '1001'},
      mtitle2: {content: '行业报道', id: '1002'}
    }
    const lists=[
      {"article_id":14,"article_title":"a","created_at":"2018-01-03 09:32:08"},
      {"article_id":13,"article_title":"aa","created_at":"2018-01-03 09:29:54"}]
    let homeList = ''
    if (this.state.homeList) {
      homeList = this.state.homeList
    } else {
      homeList = ''
    }
    return (
      <div className='app-home'>
        <div className='app-home-top'>
          <div className='app-home-top-a'>
            <AutoCarousel images={images2} time={5000}/>
          </div>
          <div className='app-home-top-b'>
            <div className='app-home-top-b-top'>
              <div className='app-home-top-b-top-title'>
                {homeList[1] ? (
                  <Link className='app-home-top-b-top-title-link' to={'/staticPage/' + homeList[1].catalog_id}>
                    {homeList[1].catalog_name}
                  </Link>
                ) : ('暂无数据')}
              </div>
              <div className='app-home-top-b-top-more'>
                {homeList[1] ? (
                  <Link style={{textDecoration:'none',color:'#ffffff'}} to={'/staticPage/' + homeList[1].catalog_id}>
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
              title2={homeList[6].catalog_name}
              list1Info={homeList[2].article_list}
              list2Info={homeList[6].article_list}
              showNum={8}/>
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
              list1Info={homeList[4].article_list}
              list2Info={homeList[3].article_list}
              showNum={8}/>
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
            {homeList[5] ? (
              <HomeMiddleList listInfo={homeList[5].article_list} showNum={8}/>
            ) : (
              <div className='app-home-middle-none-content'>
                暂无数据
              </div>
            )}
          </div>
        </div>
        <div className='app-home-middle3'>
          <div className='title-right'>
            优秀建筑展示
          </div>
          <div className='app-home-middle3-content'>
            {images3.map((image, i) => {
              return (
                <div key={i} className='app-home-middle3-content-item'>
                  <img src={image} alt=''/>
                </div>
              )
            })}
          </div>
        </div>
        <div className='app-home-middle2'>
          {homeList[5] ? (
            <HomeMiddleContainer
              title1={homeList[5].catalog_name}
              title2={homeList[7].catalog_name}
              list1Info={homeList[5].article_list}
              list2Info={homeList[7].article_list}
              showNum={8}/>
          ) : (
            <div className='app-home-middle-none'>
              <div className='app-home-middle-none-title'/>
              <div className='app-home-middle-none-content'>
                暂无数据
              </div>
            </div>
          )}
          {homeList[9] ? (
            <HomeMiddleContainer
              title1={homeList[8].catalog_name}
              title2={'资料下载'}
              list1Info={homeList[8].article_list}
              list2Info={homeList[9].article_list}
              showNum={8}/>
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

export default AppHomePage
