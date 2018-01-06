import React from 'react'
import './index.less'

class Carousel extends React.Component {
  render () {
    return (
      this.props.images.map((image,i)=>{
        return (
          <div key={i} className='none-auto-carousel-center-img'>
            <img src={image} alt=""/>
          </div>
        )
      })
    )
  }
}

export default Carousel
