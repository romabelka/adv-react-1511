import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import PersonPage from './person-page'
import EventsPage from './events-page'

class AdminPage extends Component {
  get menu() {
    return (
      <nav>
        <div>
          <NavLink to="/admin/people" activeStyle={{ color: 'red' }}>
            People
          </NavLink>
        </div>
        <div>
          <NavLink to="/admin/events" activeStyle={{ color: 'red' }}>
            Events
          </NavLink>
        </div>
      </nav>
    )
  }

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        {this.menu}
        <Route path="/admin/people" component={PersonPage} />
        <Route path="/admin/events" component={EventsPage} />
      </div>
    )
  }
}

export default AdminPage
