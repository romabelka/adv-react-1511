import React, { Component } from 'react'
import AddUserForm from '../user-manager/add-user-form.js'

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

    handleAddUser = (form) => console.log('add user form', form)
}

export default AdminPage