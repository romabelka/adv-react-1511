import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import AddUserForm from "../AddUserForm";
import { addUser } from "../../ducks/users";

class AddUser extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <h1>Add User Form</h1>
        <Route
          path="/add-user"
          render={() => <AddUserForm onSubmit={this.handleAdd} />}
        />
      </div>
    );
  }

  handleAdd = async ({ email, firstName, lastName }) =>
    this.props.addUser(email, firstName, lastName);
}

export default connect(
  null,
  { addUser }
)(AddUser);
