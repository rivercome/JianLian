import React from 'react'
import './index.less'

export default class AutoCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      activeBackGround: this.props.images[0],
      link: '#'
    }
    this.autoPlay = this.autoPlay.bind(this)
  }

  componentWillMount () {
    this.autoPlay(this.state.index, this.props.images, this.props.time)
  }

  autoPlay (index, images, time) {
    (index >= this.props.images.length) && (index = 0)
    let imageId = ''
    let link = '#'
    for (let key in images[index]) {
      if (images[index].hasOwnProperty(key)) {
        imageId = key
        link = images[index].url
      }
    }
    // for (let key in image) {
    //   if (image.hasOwnProperty(key)) {
    //     imageId = image.picture_url
    //     link = image.url
    //   }
    // }
    this.setState({
      activeBackGround: images[index].picture_url,
      link: link
    })
    setTimeout(() => this.autoPlay(index + 1, images, time), time)
  }

  render () {
    return (
      <a href={this.state.link}>
        <div className='bgImg' style={{
          animation: `radar ${this.props.time / 1000}s linear infinite`,
          background: `url("${this.state.activeBackGround}") no-repeat center`,
          backgroundSize: '100%'
        }} />
      </a>
    )
  }
}
