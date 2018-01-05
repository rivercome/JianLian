import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'

class HomeMiddleTitle extends Component {
  constructor () {
    super()
    this.state = {
      isFocus: {
        title1: true,
        title2: false
      }
    }
    this.FocusM1 = this.FocusM1.bind(this)
    this.FocusM2 = this.FocusM2.bind(this)
    this.handleClickM1 = this.handleClickM1.bind(this)
    this.handleClickM2 = this.handleClickM2.bind(this)
  }

  FocusM1 () {
    if (this.state.isFocus.title1) {
      return 'app-home-middle-title-focus'
    } else {
      return 'app-home-middle-title-no-focus'
    }
  }

  FocusM2 () {
    if (this.state.isFocus.title2) {
      return 'app-home-middle-title-focus'
    } else {
      return 'app-home-middle-title-no-focus'
    }
  }

  handleClickM1 () {
    this.setState({
      isFocus: {
        title1: true,
        title2: false
      }
    })
    this.props.onChangeFocus({title1: true, title2: false})
  }

  handleClickM2 () {
    this.setState({
      isFocus: {
        title1: false,
        title2: true
      }
    })
    this.props.onChangeFocus({title1: false, title2: true})
  }

  render () {
    const {title1, title2, title1Id, title2Id} = this.props
    // const titleLink = '/staticPage/catalog/' + this.props.link
    return (
      <div className='app-home-middle-title-container'>
        <div onMouseMove={this.handleClickM1}>
          <Link className={this.FocusM1()} to={'/staticPage/catalog/' + (title1Id || 0)}>{title1}</Link>
        </div>
        <div onMouseMove={this.handleClickM2}>
          <Link className={this.FocusM2()} to={'/staticPage/catalog/' + (title2Id || 0)}>{title2}</Link>
        </div>
      </div>
    )
  }
}

export default HomeMiddleTitle
