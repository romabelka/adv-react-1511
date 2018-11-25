import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import AdminPage from './components/routes/admin'
import AuthPage from './components/routes/auth'
import EventsPage from './components/routes/events-page'
import ProtectedRoute from './components/common/protected-route'

export default class App extends Component {
  get menu() {
    return (
      <nav>
        <div>
          <NavLink to="/admin" activeStyle={{ color: 'red' }}>
            Admin
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-in" activeStyle={{ color: 'red' }}>
            Sign In
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-up" activeStyle={{ color: 'red' }}>
            Sign Up
          </NavLink>
        </div>
        <div>
          <NavLink to="/events" activeStyle={{ color: 'red' }}>
            Events
          </NavLink>
        </div>
      </nav>
    )
  }
  render() {
    return (
      <Fragment>
        {this.menu}
        <div>
          <ProtectedRoute path="/admin" component={AdminPage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/events" component={EventsPage} />
        </div>
      </Fragment>
    )
  }
}
