import React, { Component } from 'react'
import './index.less'

class HomePictureContent extends Component {
  constructor () {
    super()
    this.animationMatch = this.animationMatch.bind(this)
  }

  animationMatch () {
    const images = this.props.images
    if (images.length === 20) {
      return 'app-home-picture-content12'
    } else if (images.length === 19) {
      return 'app-home-picture-content11'
    } else if (images.length === 18) {
      return 'app-home-picture-content10'
    } else if (images.length === 17) {
      return 'app-home-picture-content9'
    } else {
      return ''
    }
  }

  render () {
    const images = this.props.images
    let blankDiv = []
    let blankNum = 0
    if (images.length < 8) {
      blankNum = 8 - images.length
    }
    for (let i = 1; i <= blankNum; i++) {
      blankDiv.push(1)
    }
    return (
      <div className={'app-home-picture-content ' + this.animationMatch()}>
        {images.map((image, i) => {
          let imageId = ''
          for (let key in image) {
            if (image.hasOwnProperty(key)) {
              imageId = image[key]
            }
          }
          return (
            <div key={i} className='app-home-picture-content-item'>
              <img src={imageId} alt=''/>
            </div>
          )
        })}
        {blankDiv.map((blank,i)=>{
          return (
            <div key={i} className='app-home-picture-content-blank'>
              暂无图片
            </div>
          )
        })}
      </div>
    )
  }
}

export default HomePictureContent
