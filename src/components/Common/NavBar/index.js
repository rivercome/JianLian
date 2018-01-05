import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

export default ({navDatas}) => {
  return (
    <ul className='nav-bar'>
      <li key={-1} className='nav-bar-li'><Link className='nav-bar-li-link' to='/home'>首页</Link></li>
      {navDatas.map((navData, index) => {
        let li1Link = ''
        if (navData.id === 1 && navData.nextLvCatalog[0]) {
          li1Link = '/staticPage/catalog/' + navData.id
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
                  const li2Link = '/StaticPage/catalog/' + li2.id
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
