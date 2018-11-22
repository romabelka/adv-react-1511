import React, { Component } from "react";
import { connect } from "react-redux";

class AdminPage extends Component {
  static propTypes = {};

  render() {
    return this.props.user ? (
      <div>
        <h1>Admin page</h1>
      </div>
    ) : (
      <div>
        <h1>You need to be logged in to see this page</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth && state.auth.user };
};

export default connect(mapStateToProps)(AdminPage);
