import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import AdminPage from './components/routes/admin'
import AuthPage from './components/routes/auth'
import PersonPage from './components/routes/person'
import PrivateRoute from "./components/common/private";

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
                    <NavLink to = "/person/person" activeStyle={{ color: 'red' }}>New Person</NavLink>
                </div>
                <div>
                    <PrivateRoute path = "/admin" component = {AdminPage}/>
                    <Route path = "/auth" component = {AuthPage}/>
                    <Route path = "/person" component = {PersonPage}/>
                </div>
            </Fragment>
        )
    }
}