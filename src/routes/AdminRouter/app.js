import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout/index'
import AdminHomePage from './home'
import Test from './Test'

const AdminRouter = () => {
  return (
    <AdminLayout>
      <Switch>
        <Route exact path='/admin' component={AdminHomePage}/>
        <Route path='/admin/test' component={Test}/>
      </Switch>
    </AdminLayout>
  )
}

export default AdminRouter
