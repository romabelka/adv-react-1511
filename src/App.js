import React, { Component, Fragment } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/auth/private-route'
import AdminPage from './components/routes/admin'
import AuthPage from './components/routes/auth'
import AddUserPage from './components/routes/add-user'

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <div>
                    <NavLink to = "/admin" activeStyle={{ color: 'red' }}>Admin</NavLink>
                </div>
                <div>
                    <NavLink to = "/auth/sign-in" activeStyle={{ color: 'red' }}>Sign In</NavLink>
                </div>
                <div>
                    <NavLink to = "/auth/sign-up" activeStyle={{ color: 'red' }}>Sign Up</NavLink>
                </div>
                <div>
                  <NavLink to = "/add-user" activeStyle={{ color: 'red' }}>Add user</NavLink>
                </div>
                <Switch>
                    <PrivateRoute path = "/admin" component = {AdminPage}/>
                    <Route path = "/auth" component = {AuthPage}/>
                    <Route path = "/add-user" component = {AddUserPage}/>
                </Switch>
            </Fragment>
        )
    }
}