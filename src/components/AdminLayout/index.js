import React from 'react'
import { Link } from 'react-router-dom'

const AdminLayout = (props) => {
  return (
    <div>
      <header>
        <Link to='/home'> home </Link>
        <Link to='/admin'> admin </Link>
        <Link to='/admin/test'> test </Link>
      </header>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default AdminLayout
