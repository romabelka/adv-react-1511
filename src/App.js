import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import AdminPage from './components/routes/admin'
import AuthPage from './components/routes/auth'

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
                    <Route path = "/admin" component = {AdminPage}/>
                    <Route path = "/auth" component = {AuthPage}/>
                </div>
            </Fragment>
        )
    }
}