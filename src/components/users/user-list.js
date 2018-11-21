import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {removeUser} from "../../ducks/users";

const User = ({user, removeUser}) => {
    return (
        <Fragment>
            <span>
                {user.firstName}
            </span>
            <button style={{marginLeft: 15}}
                    title={'Remove user'}
                    onClick={() => removeUser(user.id)}>x</button>
        </Fragment>
    );
}

class UserList extends Component {
    render() {
        return (
            <ul>
                {this.props.users.map((user, i) => {
                    return (
                        <li key={user.id}>
                            <User user={user} removeUser={this.props.removeUser} />
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default connect((state) => ({users: [...state.users]}), { removeUser })(UserList);
