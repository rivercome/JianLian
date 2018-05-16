import React from 'react'
import './index.less'

class Carousel extends React.Component {
  render () {
    return (
      this.props.images.map((image, i) => {
        let imageId = ''
        let link = '#'
        for (let key in image) {
          if (image.hasOwnProperty(key)) {
            imageId = image.picture_url
            link = image.url
          }
        }
        return (
          <div key={i} className='none-auto-carousel-center-img'>
            <a href={link}><img src={imageId} alt='' style={{width: '100%',height: '100%'}}/></a>
          </div>
        )
      })
    )
  }
}

export default Carousel
