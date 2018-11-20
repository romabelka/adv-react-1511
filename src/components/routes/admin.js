import React, {Component} from 'react'
import {NavLink, Route} from "react-router-dom";
import AddAccountForm from "../accounts/add-account-form";

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Admin page</h1>
                <div>
                    <NavLink to = "/admin/manage-accounts" activeStyle={{ color: 'green' }}>Manage accounts</NavLink>
                </div>
                <div>
                    <Route path= "/admin/manage-accounts" component = {AddAccountForm}/>
                </div>
            </div>
        )
    }
}

export default AdminPage