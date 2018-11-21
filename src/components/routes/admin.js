import React, { Component } from "react";
import { connect } from "react-redux";

import AddUserForm from "../admin/add-user-form";
import { addUser } from "../../ducks/users";

class AdminPage extends Component {
  render() {
    return (
      <div>
        <h1>Admin page</h1>
        <AddUserForm onSubmit={this.handleAddUser} />
      </div>
    );
  }

  handleAddUser = form => {
    this.props.addUser(form);
  };
}

export default connect(
  state => ({
    users: state.users
  }),
  { addUser }
)(AdminPage);
