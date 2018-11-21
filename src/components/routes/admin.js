import React, { Component } from 'react'
import UserForm from '../users/user-form';
import UserList from '../users/user-list';
import {createUser} from "../../ducks/users";
import {connect} from "react-redux";

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        const {createUser} = this.props;
        return (
            <div>
                <h1>Admin page</h1>
                <UserForm onSubmit={createUser} />
                <UserList />
            </div>
        )
    }
}

export default connect(null, { createUser })(AdminPage)