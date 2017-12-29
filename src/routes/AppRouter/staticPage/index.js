import React, { Component } from 'react'
import './index.less'

class StaticPage extends Component {
  render () {
    return (
      <div className='static'>
        <div className='static-nav'>nav</div>
        <div className='static-content'>content</div>
      </div>
    )
  }
}

export default StaticPage
