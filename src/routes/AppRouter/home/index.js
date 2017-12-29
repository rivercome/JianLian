import React, { Component} from 'react'
import './index.less'

class AppHomePage extends Component {
  render () {
    return (
      <div className='app-home'>
        <div className='app-home-top'>
          <div className='app-home-top-a'>top-1</div>
          <div className='app-home-top-b'>top-2</div>
          <div className='app-home-top-c'>top-3</div>
        </div>
        <div className='app-home-middle1'>
          <div className='app-home-middle1-a'>middle1-a</div>
          <div className='app-home-middle1-b'>middle1-b</div>
        </div>
        <div className='app-home-middle2'>
          <div className='app-home-middle2-a'>middle2-a</div>
          <div className='app-home-middle2-b'>middle2-b</div>
          <div className='app-home-middle2-c'>middle2-c</div>
        </div>
        <div className='app-home-middle3'>middle3</div>
        <div className='app-home-middle2'>
          <div className='app-home-middle2-a'>middle4-a</div>
          <div className='app-home-middle2-b'>middle4-b</div>
          <div className='app-home-middle2-c'>middle4-c</div>
        </div>
      </div>
    )
  }
}

export default AppHomePage
