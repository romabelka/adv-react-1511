import React, { Component } from 'react'
import {connect} from 'react-redux'
import AddUserForm from '../user/add-user-form'
import { addUser } from '../../ducks/users'

class AddUserPage extends Component {

  handleAddUser = ({ firstName, lastName, email }) => {
    this.props.addUser(firstName, lastName, email)
  }

    render() {
        return (
            <div>
                <h1>Add user page</h1>
                <AddUserForm onSubmit = {this.handleAddUser}/>
            </div>
        )
    }
}

export default connect(null, { addUser })(AddUserPage)