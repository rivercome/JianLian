/**
 * Created by out_xu on 17/7/13.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'
// import { newDate } from '../../utils/dateAbout'

class AppLayout extends Component {
  constructor () {
    super()
    this.state = {
      searchContent: '',
      // timeNow: -5,
      activeIndex: 0
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.position = this.position.bind(this)
    this.playRight = this.playRight.bind(this)
    this.autoPlay = this.autoPlay.bind(this)
  }

  componentWillMount () {
    // setInterval(() => {
    //   this.setState({
    //     timeNow: this.state.timeNow - 30
    //   })
    // }, 15000)
    // setInterval(() => {
    //   this.setState({
    //     timeNow: this.state.timeNow + 10
    //   })
    // }, 5000)
    this.autoPlay()
  }

  autoPlay () {
    const timeOuter = setInterval(this.playRight, 5000)
  }

  playRight () {
    let index = this.state.activeIndex + 1
    console.log(index)
    if (index > 2) {
      index = 0
    }
    this.setState({
      activeIndex: index
    })
  }

  position () {
    switch (this.state.activeIndex) {
      case 0:
        return 'app-header-bgImg-test1'
      case 1:
        return 'app-header-bgImg-test2'
      case 2:
        return 'app-header-bgImg-test3'
    }
  }

  handleSearchChange (e) {
    this.setState({
      searchContent: e.target.value
    })
  }

  handleSubmit () {
    console.log(this.state.searchContent)
  }

  render () {
    const navDatas = [
      {content: '首页', link: '/home'},
      {
        content: '协会概况',
        link: '/StaticPage',
        secondNav: [
          {content: '协会介绍', link: '#'},
          {content: '协会章程', link: '#'}
        ]
      },
      {content: '协会公告', link: '/StaticPage'},
      {content: '协会动态', link: '/StaticPage'},
      {content: '诚信建设', link: '/StaticPage'},
      {
        content: '创优争先',
        link: '/StaticPage',
        secondNav: [
          {content: '国家级奖项', link: '#'},
          {content: '秦皇岛市级奖项', link: '#'},
          {content: '管理规定', link: '#'}
        ]
      },
      {content: 'nav7', link: '/StaticPage'},
      {content: 'nav8', link: '/StaticPage'}]
    return (
      <div className='app'>
        <div className='app-header'>
          <div className='app-header-bgImg'>
            <div className={this.position()}/>
          </div>
          <div className='app-header-nav'>
            <ul className='app-header-nav-list'>
              {navDatas.map((nav, i) => {
                if (!nav.secondNav) {
                  return (
                    <li key={i}>
                      <Link className='nav-font' to={nav.link}>
                        {nav.content}
                      </Link>
                    </li>
                  )
                } else {
                  return (
                    <li key={i}>
                      <Link className='nav-font' to={nav.link}>{nav.content}</Link>
                      <ul className='secondNav'>
                        {nav.secondNav.map((nav2, i) => {
                          return (
                            <li key={i}>
                              <Link className='nav2-font' to={nav2.link}>
                                {nav2.content}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                }
              })}
            </ul>
            <div className='app-header-nav-search'>
              <input className='app-header-nav-search-input' type='text' onChange={this.handleSearchChange}/>
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
              联系电话：(xxx)xxxxxxxx&nbsp;&nbsp;&nbsp;传真：（xxx）xxxxxxxx
            </div>
            <div className='app-footer-info-line2'>
              邮箱：xxxxxxx@xxx.com&nbsp;&nbsp;&nbsp;
              联系地址：秦皇岛市xxxxxxxxxxxxx&nbsp;&nbsp;&nbsp;
              邮编：066000&nbsp;&nbsp;&nbsp;
              网站建设: 不洗碗工作室
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppLayout
