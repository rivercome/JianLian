import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

export default ({navDatas}) => {
  return (
    <ul className='nav-bar'>
      <li key={-1} className='nav-bar-li'><Link className='nav-bar-li-link' to='/home'>首页</Link></li>
      {navDatas.map((navData, index) => {
        let li1Link = ''
        if (navData.nextLvCatalog.length === 0) {
          li1Link = '/staticPage/catalog/' + '999'
        } else {
          li1Link = '/staticPage/catalog/' + navData.nextLvCatalog[0].id
        }
        console.log('dddd=', navData.nextLvCatalog)
        console.log(li1Link)
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
