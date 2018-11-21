import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
    render() {
        const { component: Component, authUser, ...rest } = this.props
        return (
            <Route {...rest} render={(props) => (
              authUser ? (
                <Component {...props} />
              ) : (
                <Redirect to="/auth/sign-in" />
              )
            )} />
        )
    }
}

const mapStateToProps = function(store) {
  return {
    authUser: store.auth.user
  };
}

export default connect(mapStateToProps)(PrivateRoute)