import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.less'

class AdminHomePage extends Component {
  render () {
    return (
      <div className='introduce-content'>
        <h1 className='introduce-content-title'>
          <span className='introduce-content-title-1'>后台管理</span><span className='introduce-content-title-2'>介绍</span>
        </h1>
        <div className='introduce-content-container'>
          <div className='introduce-content-container-top'>
            <div className='introduce-content-container-top-carousel'>
              <Link to='/admin/carousel'>轮播图1</Link>
            </div>
            <div className='introduce-content-container-top-navbar'>
              <Link to='/admin/catalog' className='introduce-content-container-top-navbar-bar'>导航栏1</Link>
            </div>
          </div>
          <div className='introduce-content-container-main'>
            <div className='introduce-content-container-main-1'>
              <div className='introduce-content-container-main-1-carousel introduce-content-container-main-box'>
                <Link to='/admin/carousel'>轮播图2</Link>
              </div>
              <div className='introduce-content-container-main-1-article introduce-content-container-main-box'>
                文章列表1
              </div>
              <div className='introduce-content-container-main-1-img introduce-content-container-main-box'>
                图片导航1
              </div>
            </div>
            <div className='introduce-content-container-main-2'>
              <div className='introduce-content-container-main-2-img introduce-content-container-main-box'>
                图片导航2
              </div>
              <div className='introduce-content-container-main-2-box introduce-content-container-main-box'>
                导航栏2
              </div>
            </div>
            <div className='introduce-content-container-main-3'>
              <div className='introduce-content-container-main-3-article introduce-content-container-main-box'>
                文章列表2
              </div>
              <div className='introduce-content-container-main-3-article introduce-content-container-main-box'>
                文章列表3
              </div>
              <div className='introduce-content-container-main-3-articleend introduce-content-container-main-box'>
                文章列表4
              </div>
            </div>
            <div className='introduce-content-container-main-4'>
              <Link to='/admin/carousel'>轮播图3</Link>
            </div>
            <div className='introduce-content-container-main-3'>
              <div className='introduce-content-container-main-3-article introduce-content-container-main-box'>
                文章列表5
              </div>
              <div className='introduce-content-container-main-3-article introduce-content-container-main-box'>
                文章列表6
              </div>
              <div className='introduce-content-container-main-3-carousel introduce-content-container-main-box'>
                <Link to='/admin/carousel'>轮播图4</Link>
              </div>
            </div>
            <div className='introduce-content-container-main-footer'>
              底部导航1
            </div>
            <div className='introduce-content-container-main-footer'>
              底部导航2
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminHomePage
