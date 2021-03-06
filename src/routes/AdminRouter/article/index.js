import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ArticleViewPage from './view'
import ArticleEditPage from './edit'

export default class ArticlePage extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path='/jzylhh/article/view/:id' component={ArticleViewPage} />
        <Route exact path='/jzylhh/article/edit' component={ArticleEditPage} />
      </Switch>
    )
  }
}
