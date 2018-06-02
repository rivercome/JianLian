import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import AppLayout from '../../components/AppLayout/index'
import Home from './home/index'
import AsyncComponent from '../../components/AsyncComponent/index'
import StaticPageList from './staticPageList/index'
import StaticPageArticle from './staticPageArticle/index'

const AsyncDemo = AsyncComponent(() => import('./asyncDemo/index.js'))

const AppRouter = () => {
  return (
    <AppLayout>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/home' component={Home}/>
        <Route path='/async' component={AsyncDemo} />
        <Route path='/StaticPage/catalog/:id' component={StaticPageList}/>
        <Route path='/StaticPage/article/:id' component={StaticPageArticle}/>
      </Switch>
    </AppLayout>
  )
}

export default AppRouter
