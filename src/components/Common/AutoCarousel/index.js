import React from 'react'
import './index.less'

export default class AutoCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      activeBackGround: this.props.images[0]
    }
    this.autoPlay = this.autoPlay.bind(this)
  }

  componentWillMount () {
    this.autoPlay(this.state.index, this.props.images, this.props.time)
  }

  autoPlay (index, images, time) {
    (index >= this.props.images.length) && (index = 0)
    let imageId = ''
    for (let key in images[index]) {
      if (images[index].hasOwnProperty(key)) {
        imageId = key
      }
    }
    this.setState({
      activeBackGround: images[index][imageId]
    })
    setTimeout(() => this.autoPlay(index + 1, images, time), time)
  }

  render () {
    return (
      <div className='bgImg' style={{
        animation: `radar ${this.props.time / 1000}s linear infinite`,
        background: `url("${this.state.activeBackGround}") no-repeat`
      }}/>
    )
  }
}
