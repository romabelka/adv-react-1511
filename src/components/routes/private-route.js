import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { isAuth } from '../../ducks/auth'

class PrivateRoute extends React.Component {

  render() {
    const { component: Component, isAuth, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={
          props => (
            isAuth ?
              (<Component {...props} />) :
              (<Redirect
                to={{
                  pathname: "/auth/sign-in",
                  state: { from: props.location }
                }}
              />)
          )
        }
      />
    )
  }
}

export default withRouter(connect(
  state => ({
    isAuth: isAuth(state),
  }), null)(PrivateRoute))
