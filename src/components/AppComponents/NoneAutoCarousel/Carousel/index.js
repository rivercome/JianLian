import React from 'react'
import './index.less'

class Carousel extends React.Component {
  render () {
    return (
      this.props.images.map((image, i) => {
        let imageId = ''
        for (let key in image) {
          if (image.hasOwnProperty(key)) {
            imageId = image[key]
          }
        }
        return (
          <div key={i} className='none-auto-carousel-center-img'>
            <img src={imageId} alt=""/>
          </div>
        )
      })
    )
  }
}

export default Carousel
