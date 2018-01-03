import React from 'react'
import {Link} from 'react-router-dom'
import './index.less'

export default class DropDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      upIcon: 'icon-less',
      downIcon: 'icon-moreunfold'
    }
  }
  render () {
    let {sideBarList} = this.props
    return (
      sideBarList.children && (sideBarList.children.length > 0) ? (
        <div style={{position: 'relative'}}>
          <div className='side-bar-list' onClick={() => { this.setState({open: !this.state.open}) }}>
            <i className={`iconfont ${sideBarList.icon}`} />
            &nbsp; {sideBarList.title} &nbsp;
            <i className={this.state.open ? `iconfont ${this.state.upIcon}` : `iconfont ${this.state.downIcon}`} />
          </div>
          <div className='side-bar-list-child' style={{height: this.state.open ? sideBarList.children.length * 50 + 'px' : '0px'}}>
            <div>
              {sideBarList.children.map((list, index) => {
                if (list.children && (list.children.length > 0)) {
                  return (
                    <div key={`${list.title}-${index}`} className='side-bar-list-child-list'>
                      <div className='side-bar-list-child-list-text'>{list.title}</div>
                      <div className='side-bar-list-child-list-child'>
                        {list.children.map((child, i) => {
                          return (
                            <div className='side-bar-list-child-list-child-link' key={`${child.title}-${i}`}>
                              <Link style={{color: '#ccc', display: 'block', width: '100%'}} to={child.link || '/'}>{child.title}</Link>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div key={`${list.title}-${index}`} className='side-bar-list-child-list'>
                      <Link className='link' style={{width: '100%', display: 'block'}} to={list.link || '/'}>{list.title}</Link>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className='side-bar-list'>
          <Link className='link' to={sideBarList.link || '/'}>
            <i className={`iconfont ${sideBarList.icon}`} /> &nbsp;
            {sideBarList.title}
          </Link>
        </div>
      )
    )
  }
}
