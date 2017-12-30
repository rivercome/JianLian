import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

export default ({navDatas}) => {
  return (
    <ul className='nav-bar'>
      {navDatas.map((ul1, index) => {
        return (
          <li key={index} className='nav-bar-li'>
            <Link className='nav-bar-li-link' to={ul1.link}>{ul1.content}</Link>
            {ul1.children && (
              <ul className='nav-bar-li-childUl'>
                {ul1.children.map((ul2, index) => {
                  return (
                    <li key={index} className='nav-bar-li-childUl-li'>
                      <Link className='nav-bar-li-childUl-li-link' to={ul2.link}>{ul2.content}</Link>
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
