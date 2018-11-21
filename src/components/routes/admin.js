import React, { Component, Fragment } from "react";
import { NavLink, Route } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { addUser, usersSelector } from "../../ducks/users";
import AddUserForm from "../userManagment/AddUserForm";
import UsersList from "../userManagment/UsersList";

class AdminPage extends Component {
  static propTypes = {};

  handleAddUser = ({ username, email, password }) =>
    this.props.addUser({ username, email, password });

  render() {
    return (
      <Fragment>
        <h1>Admin page</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/add-user" activeStyle={{ color: "red" }}>
                addUser
              </NavLink>
            </li>
          </ul>
        </nav>
        <section>
          <Route
            path="/admin/add-user"
            render={() => <AddUserForm onSubmit={this.handleAddUser} />}
          />
        </section>
        <section>
          <UsersList users={this.props.users} />
        </section>
      </Fragment>
    );
  }
}

export default connect(
  state => ({ users: usersSelector(state) }),
  { addUser }
)(AdminPage);
