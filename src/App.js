import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import AdminPage from './components/routes/admin'
import AuthPage from './components/routes/auth'
import PersonPage from './components/routes/people'
import ProtectedRoute from './components/common/protected-route'

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <div>
                    <NavLink to = "/admin" activeStyle={{ color: 'red' }}>Admin</NavLink>
                </div>
                <div>
                    <NavLink to = "/people" activeStyle={{ color: 'red' }}>People</NavLink>
                </div>
                <div>
                    <NavLink to = "/auth/sign-in" activeStyle={{ color: 'red' }}>Sign In</NavLink>
                </div>
                <div>
                    <NavLink to = "/auth/sign-up" activeStyle={{ color: 'red' }}>Sign Up</NavLink>
                </div>

                <div>
                    <ProtectedRoute path = "/admin" component = {AdminPage}/>
                    <Route path = "/auth" component = {AuthPage}/>
                    <ProtectedRoute path = "/people" component = {PersonPage}/>
                </div>
            </Fragment>
        )
    }
}