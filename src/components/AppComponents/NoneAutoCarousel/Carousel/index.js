import React from 'react'

class Carousel extends React.Component {
  render () {
    return (
      <div className='bgImg' style={{background: `url("${this.props.images[this.props.index]}")`}}/>
    )
  }
}

export default Carousel
