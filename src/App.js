import React, { Component, Fragment } from "react";
import { NavLink, Route, Redirect, withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { isAuthenticated, init, userSelector } from "./ducks/auth";
import AdminPage from "./components/routes/admin";
import AuthPage from "./components/routes/auth";

class App extends Component {
  componentDidMount() {
    this.props.initAuth();
  }

  render() {
    return (
      <Fragment>
        <h1>
          {`Hello, ${
            this.props.isAuthenticated && this.props.user
              ? this.props.user.email
              : "guest"
          }!`}
        </h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/admin" activeStyle={{ color: "red" }}>
                Admin
              </NavLink>
            </li>
            {this.props.isAuthenticated ? (
              <Fragment>
                <li>
                  <NavLink to="/auth/sign-out" activeStyle={{ color: "red" }}>
                    Log Out
                  </NavLink>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <NavLink to="/auth/sign-in" activeStyle={{ color: "red" }}>
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/auth/sign-up" activeStyle={{ color: "red" }}>
                    Sign Up
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
        <section>
          <Route path="/auth" component={AuthPage} />
          <Route
            path="/admin"
            render={props =>
              this.props.isAuthenticated ? (
                <AdminPage {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/auth/sign-in",
                    state: { from: props.location }
                  }}
                />
              )
            }
          />
        </section>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      isAuthenticated: isAuthenticated(state),
      user: userSelector(state)
    }),
    { initAuth: init }
  )(App)
);
