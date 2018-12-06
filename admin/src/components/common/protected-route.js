import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { isAuthorizedSelector } from '../../ducks/auth'

class ProtectedRoute extends Component {
  render() {
    const { isAuthorized, component, ...rest } = this.props
    return <Route {...rest} render={this.getComponent} />
  }

  getComponent = () => {
    const { isAuthorized, ...rest } = this.props
    return isAuthorized ? <Route {...rest} /> : <h1>Not Authorized</h1>
  }
}

export default connect(
  (state) => ({
    isAuthorized: isAuthorizedSelector(state)
  }),
  null,
  null,
  { pure: false }
)(ProtectedRoute)
