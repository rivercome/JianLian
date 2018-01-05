import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'

class HomePictureTitle extends Component {
  constructor () {
    super()
    this.state = {
      isFocus: {
        title1: true,
        title2: false,
        title3: false
      }
    }
    this.FocusM1 = this.FocusM1.bind(this)
    this.FocusM2 = this.FocusM2.bind(this)
    this.FocusM3 = this.FocusM3.bind(this)
    this.handleClickM1 = this.handleClickM1.bind(this)
    this.handleClickM2 = this.handleClickM2.bind(this)
    this.handleClickM3 = this.handleClickM3.bind(this)
  }

  FocusM1 () {
    if (this.state.isFocus.title1) {
      return 'app-home-picture-title-focus'
    } else {
      return 'app-home-picture-title-no-focus'
    }
  }

  FocusM2 () {
    if (this.state.isFocus.title2) {
      return 'app-home-picture-title-focus'
    } else {
      return 'app-home-picture-title-no-focus'
    }
  }

  FocusM3 () {
    if (this.state.isFocus.title3) {
      return 'app-home-picture-title-focus'
    } else {
      return 'app-home-picture-title-no-focus'
    }
  }

  handleClickM1 () {
    this.setState({
      isFocus: {
        title1: true,
        title2: false,
        title3: false
      }
    })
    this.props.onChangeFocus({title1: true, title2: false, title3: false})
  }

  handleClickM2 () {
    this.setState({
      isFocus: {
        title1: false,
        title2: true,
        title3: false
      }
    })
    this.props.onChangeFocus({title1: false, title2: true, title3: false})
  }

  handleClickM3 () {
    this.setState({
      isFocus: {
        title1: false,
        title2: false,
        title3: true
      }
    })
    this.props.onChangeFocus({title1: false, title2: false, title3: true})
  }

  render () {
    const title1 = this.props.title1
    const title2 = this.props.title2
    const title3 = this.props.title3
    return (
      <div className='app-home-picture-title-container'>
        <div onMouseMove={this.handleClickM1}>
          <Link className={this.FocusM1()} to='#'>{title1}</Link>
        </div>
        <div onMouseMove={this.handleClickM2}>
          <Link className={this.FocusM2()} to='#'>{title2}</Link>
        </div>
        <div onMouseMove={this.handleClickM3}>
          <Link className={this.FocusM3()} to='#'>{title3}</Link>
        </div>
      </div>
    )
  }
}

export default HomePictureTitle
