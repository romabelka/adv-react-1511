import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignInForm from "../auth/sign-in-form";
import SignUpForm from "../auth/sign-up-form";
import SignOutView from "../auth/sign-out-form";
import { isAuthenticated, signIn, signUp, signOut } from "../../ducks/auth";

class AuthPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <Route
          path="/auth/sign-in"
          render={() =>
            this.props.isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <SignInForm onSubmit={this.handleSignIn} />
            )
          }
        />
        <Route
          path="/auth/sign-up"
          render={() =>
            this.props.isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <SignUpForm onSubmit={this.handleSignUp} />
            )
          }
        />
        <Route
          path="/auth/sign-out"
          render={() =>
            this.props.isAuthenticated ? (
              <SignOutView onSubmit={this.handleSignOut} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </div>
    );
  }

  handleSignIn = ({ email, password }) =>
    this.props.signIn(email, password).then(() => window.location.reload());
  handleSignUp = ({ email, password }) =>
    this.props.signUp(email, password).then(() => window.location.reload());
  handleSignOut = () => this.props.signOut();
}

export default connect(
  state => ({ isAuthenticated: isAuthenticated(state) }),
  { signIn, signUp, signOut }
)(AuthPage);
