import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from '../Common/SideBar'
import {message} from 'antd'
import {basePath} from '../../config/api'
import axios from 'axios'
import './index.less'

let sideBarData = [
  {
    title: '媒体库',
    icon: 'icon-meiti',
    children: [
      {
        title: '轮播图',
        link: '/admin/carousel'
      }
    ]
  },
  {
    title: '文章列表',
    icon: 'icon-wenzhang',
    children: [
      {
        title: '文章列表1',
        link: '/admin/article/view/1'
      },
      {
        title: '文章列表2',
        link: '/admin/article/view/2'
      },
      {
        title: '文章列表3',
        link: '/admin/article/view/3'
      },
      {
        title: '文章列表4',
        link: '/admin/article/view/4'
      },
      {
        title: '文章列表5',
        link: '/admin/article/view/5'
      },
      {
        title: '文章列表6',
        link: '/admin/article/view/6'
      }
    ]
  }
]

export default class AdminLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sideBarData: [
        {
          title: '媒体库',
          icon: 'icon-meiti',
          children: [
            {
              title: '轮播图',
              link: '/admin/carousel'
            }
          ]
        },
        {
          title: '文章列表',
          icon: 'icon-wenzhang',
          children: []
        }
      ]
    }
  }

  getCataLog () {
    axios.get(`${basePath}/catalog/show`)
      .then(res => {
        if (res.data.code === 1000) {
          let sideBarData = [...this.state.sideBarData]
          let children = res.data.catalog.map(item => {
            return {
              id: item.id,
              title: item.name,
              children: item.nextLvCatalog.map(child => {
                return {
                  id: child.id,
                  title: child.name,
                  link: `/admin/article/view/${child.id}?className=${child.name}&parentClassName=${item.name}&classId=${child.id}&parentClassId=${item.id}`
                }
              })
            }
          })
          sideBarData.map(item => {
            if (item.title === '文章列表') {
              item.children = children
            }
            return item
          })
          this.setState({sideBarData})
        } else {
          message.error('获取信息失败')
        }
      })
  }

  componentWillMount () {
    this.getCataLog()
  }

  render () {
    return (
      <div className='admin'>
        <header className='admin-header'>
          <div className='admin-header-left'>
            <Link to='/admin' style={{textDecoration: 'none', cursor: 'pointer'}}>
              <span className='admin-header-left-title-1'>秦皇岛建联</span><span className='admin-header-left-title-2'>后台管理</span>
            </Link>
          </div>
          <div className='admin-header-right' />
        </header>
        <div className='admin-content'>
          <SideBar sideBarData={this.state.sideBarData} />
          <div className='admin-content-container'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
