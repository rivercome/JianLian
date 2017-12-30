import React from 'react'
import './index.less'

export default class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      activeBackGround: null
    }
  }
  componentWillMount () {
    this.autoPlay(this.state.index, this.props.images, this.props.time)
  }
  autoPlay (index, images, time) {
    (index >= images.length) && (index = 0)
    this.setState({
      activeBackGround: images[index]
    })
    console.log(this.state.activeBackGround)
    setTimeout(() => this.autoPlay(index + 1, images, time), time)
  }
  render () {
    return (
      <div className='bgImg' style={{animation: `radar ${this.props.time / 1000}s linear infinite`, background: `url("${this.state.activeBackGround}")`}} />
    )
  }
}
