import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AdminRouter from './AdminRouter/app'
import AppRouter from './AppRouter/app'

const App = () => {
  return (
    <div style={{height: '100%'}}>
      <Switch>
        <Route path='/admin' component={AdminRouter} />
        <Route path='/' component={AppRouter} />
      </Switch>
    </div>
  )
}

export default App
