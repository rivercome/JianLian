import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'

class HomeMiddleList extends Component {
  render () {
    const lists = this.props.listInfo
    const showNum = this.props.showNum - 1 || 6
    if (lists.length === 0) {
      (
        <div className='app-home-middle-list-none'>暂无数据</div>
      )
    }
    return (
      <ul className='app-home-middle-list-container'>
        {lists.map((list, i) => {
          const titleShow = list.article_title.slice(0, 20)
          const timeShow = list.created_at.slice(0, 10)
          if (i < showNum && i < (lists.length - 1)) {
            return (
              <li className='app-home-middle-list' key={i}>
                <Link to={'/staticPage/article/' + list.article_id} className='app-home-middle-list-link'>
                  <div className='app-home-middle-list-link-content'>
                    {titleShow}
                  </div>
                </Link>
                <div className='app-home-middle-list-time'>
                  {timeShow}
                </div>
              </li>
            )
          } else if (i === showNum || i === (lists.length - 1)) {
            return (
              <li className='app-home-middle-list' style={{border: 'none'}} key={i}>
                <Link to={'/staticPage/article/' + list.article_id} className='app-home-middle-list-link'>
                  <div className='app-home-middle-list-link-content'>
                    {titleShow}
                  </div>
                </Link>
                <div className='app-home-middle-list-time'>
                  {timeShow}
                </div>
              </li>
            )
          }
        })}
      </ul>
    )
  }
}

export default HomeMiddleList
