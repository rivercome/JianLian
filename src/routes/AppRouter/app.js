import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import AppLayout from '../../components/AppLayout/index'
import NotFound from '../404'

import Home from './home/index'
// async component
import AsyncComponent from '../../components/AsyncComponent/index'
import StaticPage from './staticPage'

const AsyncDemo = AsyncComponent(() => import('./asyncDemo/index.js'))

const AppRouter = () => {
  return (
    <AppLayout>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/home' component={Home}/>
        <Route path='/StaticPage' component={StaticPage}/>
      </Switch>
    </AppLayout>
  )
}

export default AppRouter
