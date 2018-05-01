import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'
const staticCatalog = ['联合会概况', '联合会文件', '资讯中心', '诚信建设', '创先争优', '教育培训', '政策法规', '管理经纬', '法律维权', '会员之窗']

export default ({navDatas, surveyId}) => {
  return (
    <ul className='nav-bar'>
      <li key={-1} className='nav-bar-li'><Link className='nav-bar-li-link' to='/home'>首页</Link></li>
      {/* {navDatas.map((navData, index) => {
        let li1Link = ''
        if (navData.id === 1 && navData.nextLvCatalog[0]) {
          li1Link = '/staticPage/article/' + surveyId[0]
        } else if (navData.nextLvCatalog[0]) {
          li1Link = '/staticPage/catalog/' + navData.nextLvCatalog[0].id
        } else {
          li1Link = '/staticPage/catalog/' + '99999'
        }
        if (index >= 11) {
          return ''
        }
        return (
          <li key={index} className='nav-bar-li'>
            <Link className='nav-bar-li-link' to={li1Link}>{navData.name}</Link>
            {navData.nextLvCatalog && (
              <ul className='nav-bar-li-childUl'>
                {navData.nextLvCatalog.map((li2, index) => {
                  let li2Link = ''
                  if (navData.id === 1) {
                    li2Link = '/StaticPage/article/' + surveyId[index]
                  } else {
                    li2Link = '/StaticPage/catalog/' + li2.id
                  }
                  return (
                    <li key={index} className='nav-bar-li-childUl-li'>
                      <Link className='nav-bar-li-childUl-li-link' to={li2Link}>{li2.name}</Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })} */}
      {navDatas.map((navData, index) => {
        navData = navDatas.filter(item => {
          return item.name === staticCatalog[index]
        })[0]
        if (!navData || !navData.id) {
          return ''
        }
        console.log(navData)
        let li1Link = ''
        if (navData.id === 1 && navData.nextLvCatalog[0]) {
          li1Link = '/staticPage/article/' + surveyId[0]
        } else if (navData.nextLvCatalog[0]) {
          li1Link = '/staticPage/catalog/' + navData.nextLvCatalog[0].id
        } else {
          li1Link = '/staticPage/catalog/' + '99999'
        }
        if (index >= 11) {
          return ''
        }
        return (
          <li key={index} className='nav-bar-li'>
            <Link className='nav-bar-li-link' to={li1Link}>{navData.name}</Link>
            {navData.nextLvCatalog && (
              <ul className='nav-bar-li-childUl'>
                {navData.nextLvCatalog.map((li2, index) => {
                  let li2Link = ''
                  if (navData.id === 1) {
                    li2Link = '/StaticPage/article/' + surveyId[index]
                  } else {
                    li2Link = '/StaticPage/catalog/' + li2.id
                  }
                  return (
                    <li key={index} className='nav-bar-li-childUl-li'>
                      <Link className='nav-bar-li-childUl-li-link' to={li2Link}>{li2.name}</Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}
