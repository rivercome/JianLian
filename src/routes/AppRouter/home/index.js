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
import Picture from '../../../components/Common/Picture'
import StaicPicture from '../../../components/Common/StaicPicture'

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
    const images11 = [
      {'1':'/images/CarouselTest/1.jpeg'},
      {'2':'/images/CarouselTest/2.jpg'},
      {'3':'/images/CarouselTest/3.jpeg'},
      {'4':'/images/CarouselTest/4.jpeg'},
      {'5':'/images/CarouselTest/5.jpeg'},
      {'6':'/images/CarouselTest/6.jpeg'},
      {'7':'/images/CarouselTest/7.jpeg'},
      {'8':'/images/CarouselTest/8.jpeg'},
      {'9':'/images/CarouselTest/9.jpeg'},
      {'10':'/images/CarouselTest/10.jpg'},
      {'11':'/images/CarouselTest/11.jpg'},
      {'12':'/images/CarouselTest/12.jpg'},
    ]
    const images13 = [
      {'1':'/images/CarouselTest/1.jpeg'},
      {'2':'/images/CarouselTest/2.jpg'},
      {'3':'/images/CarouselTest/3.jpeg'},
      {'4':'/images/CarouselTest/4.jpeg'},
      {'5':'/images/CarouselTest/5.jpeg'},
      {'6':'/images/CarouselTest/6.jpeg'},
      {'7':'/images/CarouselTest/7.jpeg'},
      {'8':'/images/CarouselTest/8.jpeg'}
    ]
    const lists = [
      {'article_id': 14, 'article_title': 'a', 'created_at': '2018-01-03 09:32:08'},
      {'article_id': 13, 'article_title': 'aa', 'created_at': '2018-01-03 09:29:54'}
    ]
    let homeList = []
    if (this.state.homeList) {
      homeList = this.state.homeList
    } else {
      homeList = []
    }
    const {picture, catalog} = this.props
    let nav2array = []
    homeList.map((home) => {
      catalog.map((cat) => {
        if (home.catalog_id === cat.id) {
          if (cat.nextLvCatalog.length === 0) {
            nav2array.push('')
          } else {
            nav2array.push(cat.nextLvCatalog[0].id)
          }
        }
      })
    })
    let images1 = []
    if (images11) {
      if (images11.length > 8) {
        const picture3_copy = images11.slice(0, 8)
        images1 = images11.concat(picture3_copy)
      }
    }
    console.log('nav2array', nav2array,'homeList', homeList,'catalog', catalog)
    return (
      <div className='app-home'>
        {/*<div id='td-code-left' className='td-code'>*/}
          {/*<div className='td-code-img'>*/}
            {/*<img src='/images/tdCode.jpg' alt=""/>*/}
          {/*</div>*/}
          {/*<div className='td-code-font'>*/}
            {/*微信公众号<br/>*/}
            {/*欢迎关注*/}
          {/*</div>*/}
        {/*</div>*/}
        <div id='td-code-right' className='td-code'>
          <div className='td-code-img'>
            <img src='/images/tdCode.jpg'  width='80%' alt=""/>
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
                    style={{textDecoration: 'none', color: '#ffffff'}}
                    to={'/staticPage/catalog/' + nav2array[1]}>
                    <Icon type='double-right'/>更多
                  </Link>
                ) : (
                  <Link style={{textDecoration: 'none', color: '#ffffff'}} to='#'>
                    <Icon type='double-right'/>更多
                  </Link>
                )}
              </div>
            </div>
            {(homeList.length) ? (
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
              {
                picture['8'] ? (
                  <StaicPicture
                    images1={picture['8']}
                    images2={picture['9']}
                    images3={picture['10']} />
                ) : (
                  ''
                )
              }
              {/*{images2.map((image, i) => {*/}
                {/*return (*/}
                  {/*<div key={i} className='app-home-top-c-content-img'>*/}
                    {/*<img src={image} alt=""/></div>*/}
                {/*)*/}
              {/*})}*/}
            </div>
          </div>
        </div>
        <div className='app-home-middle1'>
          <div className='app-home-middle1-a'>
            {
              picture['6'] ? (
                <Picture images={picture['7']} time={5000} />
              ) : (
                ''
              )
            }
          </div>
          <div className='app-home-middle1-b'>
            <div className='title-right'>
              <Link className='app-home-top-b-top-title-link' to='#'>会员资讯</Link>
            </div>
            <div className='app-home-middle1-b-content'>
              <div className='app-home-middle1-b-content-font'>
                <Link to={'/staticPage/article/145'} style={{textDecoration: 'none'}}><Icon type='right-circle'/>&nbsp;会员单位</Link>
              </div>
              <div className='app-home-middle1-b-content-font'>
                <Link to={'/staticPage/article/144'} style={{textDecoration: 'none'}}><Icon type='right-circle'/>&nbsp;入会须知</Link>
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
                <Link className='app-home-top-b-top-title-link' to='#'>
                  {/*{homeList[5].catalog_name}*/}
                  材料信息
                </Link>
              ) : ('暂无数据')}
            </div>
            {homeList[12] ? (
              <HomeMiddleList listInfo={homeList[12].article_list} showNum={8}/>
            ) : (
              <div className='app-home-middle-none-content'>
                暂无数据
              </div>
            )}
          </div>
        </div>
        <div className='app-home-middle3'>
          {
            picture['3'] ? (
              <HomePictureContainer
                title1='优秀建筑展示'
                title2='行业风采'
                title3='行业精英'
                images1={picture['3']}
                images2={picture['4']}
                images3={picture['5']}/>
            ) : (
              ''
            )
          }
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
          {(
            <HomeMiddleContainer
              title1={'法律维权'}
              title2={'行业专家'}
              title1Id={((homeList.filter(item => item.catalog_name === '法律维权'))[0] || {}).catalog_id}
              title2Id={((homeList.filter(item => item.catalog_name === '行业专家'))[0] || {}).catalog_id}
              list1Info={((homeList.filter(item => item.catalog_name === '法律维权'))[0] || {}).article_list || []}
              list2Info={((homeList.filter(item => item.catalog_name === '行业专家'))[0] || {}).article_list || []}
              showNum={7}/>
          )}

          <div className='app-home-middle2-c'>
            <div className='title-right'>
              <Link className='app-home-top-b-top-title-link' to='/staticPage'>
                新型材料及产品展示
              </Link>
            </div>
            <div className='app-home-middle2-c-content'>
              {
                picture['6'] ? (
                  <NoneAutoCarousel images={picture['6'] || []}/>
                ) : (
                  ''
                )
              }
              {/*暂时放弃该文章列表*/}
              {/*<div className='app-home-middle2-c-content-list'>*/}
                {/*<HomeMiddleList showNum={2} listInfo={lists}/>*/}
              {/*</div>*/}
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
