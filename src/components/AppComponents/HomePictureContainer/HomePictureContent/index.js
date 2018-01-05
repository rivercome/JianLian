import React, { Component } from 'react'

class HomePictureContent extends Component {
  render () {
    const images = this.props.images
    return (
      <div className='app-home-middle3-content'>
        {images.map((image, i) => {
          return (
            <div key={i} className='app-home-middle3-content-item'>
              <img src={image} alt=''/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default HomePictureContent
