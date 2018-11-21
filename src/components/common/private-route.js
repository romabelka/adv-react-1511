import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUserSelector } from '../../redux/selectors.js'

export class PrivateRoute extends Component{
  render() {
    const {component: Component, user, ...rest} = this.props
    return (
      <Route
        {...rest}
        render={(props) => user
          ? <Component {...props} />
          : <Redirect to={{pathname: '/auth'}} />}
      />
    )
  }
}


export default connect(
  (state) => {
    return {
      user: authUserSelector(state)
    }
  }, null, null, { pure: false }
)(PrivateRoute)