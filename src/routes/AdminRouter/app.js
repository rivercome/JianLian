import React from 'react'
import { asyncComponent } from 'react-async-component'
import { Route, Switch } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout/index'
import AdminIntroducePage from './introduce'
// import AdminCarouselPage from './carousel'
const AdminCarouselPage = asyncComponent({
  resolve: () => System.import('./carousel')
})

const AdminArticlePage = asyncComponent({
  resolve: () => System.import('./article')
})

const AdminRouter = () => {
  return (
    <AdminLayout>
      <Switch>
        <Route exact path='/admin' component={AdminIntroducePage} />
        <Route exact path='/admin/carousel' component={AdminCarouselPage} />
        <Route path='/admin/article' component={AdminArticlePage} />
      </Switch>
    </AdminLayout>
  )
}

export default AdminRouter
