import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './routes/app'
import {message} from 'antd'
import axios from 'axios'

import Reducer from './reducers/index'
import './reset.css'

axios.interceptors.request.use((config) => {
  config.headers['token'] = localStorage.getItem('token') || ''
  return config
}, function (error) {
  // Do something with request error
  message.error(error.message)
  return Promise.reject(error)
})
axios.interceptors.response.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  message.error(error.message)
  return Promise.reject(error)
})

const store = createStore(Reducer)

ReactDOM.render((
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'))
