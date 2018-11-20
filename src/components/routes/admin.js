import React, {Component} from 'react'
import {NavLink, Route} from "react-router-dom";
import { connect } from 'react-redux';
import AddAccountForm from "../accounts/add-account-form";
import { addAccount } from '../../ducks/accounts'

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
                    <Route
                        path= "/admin/manage-accounts"
                        render = {() => <AddAccountForm
                        onSubmit={this.handleAddAccount} />}
                    />
                </div>
            </div>
        )
    }

    handleAddAccount = ({ email, password }) => this.props.addAccount(email, password)
}

export default connect(state => ({
        accounts: state.accounts.toJS()
    })
, { addAccount })(AdminPage)