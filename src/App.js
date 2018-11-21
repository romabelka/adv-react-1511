import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import AdminPage from './components/routes/admin'
import AuthPage from './components/routes/auth'
import People from './components/routes/people'

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
                    <NavLink to = "/people" activeStyle={{ color: 'red' }}>People</NavLink>
                </div>
                <div>
                    <Route path = "/admin" component = {AdminPage}/>
                    <Route path = "/auth" component = {AuthPage}/>
                    <Route path = "/people" component = {People}/>
                </div>
            </Fragment>
        )
    }
}