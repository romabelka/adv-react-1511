import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PersonPage from './person-page'
import EventsPage from './events-page'
import Trash from '../common/trash'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <Route path="/admin/people" component={PersonPage} />
        <Route path="/admin/events" component={EventsPage} />
        <Trash />
      </div>
    )
  }
}

export default AdminPage
