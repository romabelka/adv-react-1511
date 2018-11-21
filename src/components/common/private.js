import React, { Component } from "react"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import { loggedInSelector } from "../../ducks/auth"
 const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn === true ? (
          <Component {...props} />
        ):(
          <Redirect to="/auth/sign-in" />
        )
      }
    />
  )
}
 export default connect(
  state => ({ loggedIn: loggedInSelector(state) }), null, null, { pure: false })(PrivateRoute)