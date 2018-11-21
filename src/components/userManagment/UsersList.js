import React, { Component, Fragment } from "react";
import ErrorField from "../common/error-field";

class UsersList extends Component {
  static propTypes = {};
  render() {
    return (
      <Fragment>
        <h3>Users</h3>
        <ul>
          {this.props.users.map(user => (
            <li key={user.email}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default UsersList;
