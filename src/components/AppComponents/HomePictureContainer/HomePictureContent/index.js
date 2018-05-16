import React, { Component } from 'react'
import './index.less'
import axios from 'axios'
import { basePath } from '../../../../config/api'

class HomePictureContent extends Component {
  constructor () {
    super()
    this.state = {
      images: []
    }
    this.animationMatch = this.animationMatch.bind(this)
  }

  animationMatch () {
    const images = this.props.images || []
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
    const images = this.props.images || []
    let blankDiv = []
    let blankNum = 0
    if (images.length < 8) {
      blankNum = 8 - images.length
    }
    for (let i = 1; i <= blankNum; i++) {
      blankDiv.push(1)
    }
    // console.log(images)
    return (
      <div className={'app-home-picture-content ' + this.animationMatch()}>
        {images.map((image, i) => {
          let imageId = ''
          let link = '#'
          for (let key in image) {
            if (image.hasOwnProperty(key)) {
              imageId = image.picture_url
              link = image.url
            }
          }
          return (
            <div key={i} className='app-home-picture-content-item'>
              <a href={link}><img src={imageId} alt='' style={{width: '100%',height: '100%'}} /></a>
            </div>
          )
        })}
        {blankDiv.map((blank, i) => {
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
