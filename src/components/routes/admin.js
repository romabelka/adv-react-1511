import React, { Component } from 'react'
import AddUserForm from '../user-manager/add-user-form.js'
import {connect} from 'react-redux'
import {addUser} from '../../ducks/admin'

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Admin page</h1>
                <AddUserForm onSubmit = {this.handleAddUser} />
            </div>
        )
    }

    handleAddUser = (form) => this.props.addUser(form) 
}

export default connect(null, { addUser })(AdminPage)
