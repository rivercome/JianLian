import React from 'react'
import Carousel from './Carousel/index'
import { Icon } from 'antd'
import './index.less'

class NoneAutoCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      CarouselNum: 0,
      maxNum: 2
    }
    this.preCarousel = this.preCarousel.bind(this)
    this.nextCarousel = this.nextCarousel.bind(this)
  }

  componentWillMount () {
    this.setState({
      maxNum: this.props.images.length
    })
  }

  preCarousel () {
    this.setState({
      CarouselNum: ((this.state.CarouselNum - 1) >= 0) ? (this.state.CarouselNum - 1) : (this.state.maxNum - 1)
    })
  }

  nextCarousel () {
    this.setState({
      CarouselNum: ((this.state.CarouselNum + 1) < this.state.maxNum) ? (this.state.CarouselNum + 1) : (0)
    })
  }

  render () {
    return (
      <div style={{overflow: 'hidden'}}>
        <div className='none-auto-carousel-arrow'>
          <Icon type='left' onClick={this.preCarousel} style={{fontSize: '25px'}}/>
        </div>
        <div className='none-auto-carousel-center-container'>
          <div className='none-auto-carousel-center' style={{marginLeft: '-' + this.state.CarouselNum * 115 + 'px'}}
               onClick={this.nextCarousel}>
            <Carousel autoPaly={false} index={this.state.CarouselNum} images={this.props.images}/>
          </div>
        </div>
        <div className='none-auto-carousel-arrow'>
          <Icon type='right' onClick={this.nextCarousel} style={{fontSize: '25px'}}/>
        </div>
      </div>
    )
  }
}

export default NoneAutoCarousel
