import React, { Component } from 'react'
import './index.less'

export default class StaicPicture extends Component {
  constructor () {
    super()
    this.state = {
      images: []
    }
  }
  render () {
    const images1 = this.props.images1 || []
    const images2 = this.props.images2 || []
    const images3 = this.props.images3 || []

    return (
      <div >
        <div >
          {images1.map((image, i) => {
            let imageId = ''
            let link = '#'
            for (let key in image) {
              if (image.hasOwnProperty(key)) {
                imageId = image.picture_url
                link = image.url
              }
            }
            return (
              <div key={i} >
                <a href={link}><img src={imageId} alt='' style={{width: '100%',height: '66px'}} /></a>
              </div>
            )
          })}
          {images2.map((image, i) => {
            let imageId = ''
            let link = '#'
            for (let key in image) {
              if (image.hasOwnProperty(key)) {
                imageId = image.picture_url
                link = image.url
              }
            }
            return (
              <div key={i} >
                <a href={link}><img src={imageId} alt='' style={{width: '100%',height:'66px'}} /></a>
              </div>
            )
          })}
          {images3.map((image, i) => {
            let imageId = ''
            let link = '#'
            for (let key in image) {
              if (image.hasOwnProperty(key)) {
                imageId = image.picture_url
                link = image.url
              }
            }
            return (
              <div key={i}>
                <a href={link}><img src={imageId} alt='' style={{width: '100%',height: '66px'}} /></a>
              </div>
            )
          })}

        </div>
      </div>
    )
  }
}


