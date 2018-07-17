import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeMiddleTitle from '../../../components/AppComponents/HomeMiddleContainer/HomeMiddleTitle'

class AsyncDemo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: [],
      showtitle: ''
    }
  }

  render () {
    const {article_id, article_title} = this.props
    const title = this.props.article_title
    return (
      <div>
        <div className='SerachList'>
          { title.map((item, index) => {
            return (
              <a href='http://47.104.174.246/StaticPage/catalog/${item.article_id}'>
              <div key='${index}'>
                {item.article_title}
              </div>
                <br />
              </a>

            )

          })}
          {/*<hr />*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('a', state)
  return {
    article_id: state.article_id,
    article_title: state.article_title
  }
}

export default connect(mapStateToProps)(AsyncDemo)

