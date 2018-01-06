import React, { Component } from 'react'
import './index.less'
import HomePictureTitle from './HomePictureTitle'
import HomePictureContent from './HomePictureContent/index'

class HomeMiddleContainer extends Component {
  constructor () {
    super()
    this.state = {
      isFocus: {
        title1: true,
        title2: false,
        title3: false
      }
    }
    this.handleChangeFocus = this.handleChangeFocus.bind(this)
  }

  handleChangeFocus (isFocus) {
    this.setState({
      isFocus: isFocus
    })
  }

  render () {
    const {title1, title2, title3} = this.props
    let images = []
    if (this.state.isFocus.title1 === true) {
      images = this.props.images1
    } else if (this.state.isFocus.title2 === true) {
      images = this.props.images2
    } else {
      images = this.props.images3
    }
    return (
      <div className='app-home-picture-container'>
        <HomePictureTitle title1={title1} title2={title2} title3={title3} title onChangeFocus={this.handleChangeFocus}/>
        <div className='app-home-picture-container-content'>
          <HomePictureContent images={images}/>
        </div>
      </div>
    )
  }
}

export default HomeMiddleContainer
