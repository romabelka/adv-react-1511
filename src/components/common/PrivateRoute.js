import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, redirect, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated
      ? <Component {...props} />
      : <Redirect to={redirect || "/"} />
  )} />
)