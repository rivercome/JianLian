import React, { Component } from 'react'
import HomeMiddleTitle from './HomeMiddleTitle/index'
import HomeMiddleList from './HomeMiddleList/index'
import './index.less'

class HomeMiddleContainer extends Component {
  constructor () {
    super()
    this.state = {
      isFocus: {
        title1: true,
        title2: false
      }
    }
    this.handleChangeFocus = this.handleChangeFocus.bind(this)
  }

  handleChangeFocus (isFocus) {
    this.setState({
      isFocus: isFocus
    })
  }

  render () {
    const {title1, title2, showNum} = this.props
    let listInfo = []
    if (this.state.isFocus.title1 === true) {
      listInfo = this.props.list1Info
    } else {
      listInfo = this.props.list2Info
    }
    return (
      <div className='app-home-middle-container'>
        <HomeMiddleTitle title1={title1} title2={title2} title onChangeFocus={this.handleChangeFocus}/>
        <div>
          <HomeMiddleList listInfo={listInfo} showNum={showNum}/>
        </div>
      </div>
    )
  }
}

export default HomeMiddleContainer
