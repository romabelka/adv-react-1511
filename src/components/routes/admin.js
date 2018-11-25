import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PersonPage from './person-page'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <Route path="/admin/people" component={PersonPage} />
      </div>
    )
  }
}

export default AdminPage
