import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { isLoggedSelector } from "../../ducks/auth";

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => {
  console.log("isLogged", isLogged);
  return (
    <Route
      {...rest}
      render={props =>
        isLogged === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/sign-in" />
        )
      }
    />
  );
};

export default connect(
  state => ({
    isLogged: isLoggedSelector(state)
  }),
  null,
  null,
  { pure: false }
)(PrivateRoute);
