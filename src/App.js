import React, { Component, Fragment } from 'react'
import { NavLink, Link, Route } from 'react-router-dom'
import AdminPage from './components/routes/admin'
import AuthPage from './components/routes/auth'
import {connect} from "react-redux";

class App extends Component {
    renderAdmin = (props) => {
        if (this.props.isLoggedIn) {
            return <AdminPage {...props} />
        }
        return <p>Please <Link to={'/auth/sign-in'}>Sign In</Link></p>
    }
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
                    <Route path = "/admin" render={this.renderAdmin}/>
                    <Route path = "/auth" component = {AuthPage}/>
                </div>
            </Fragment>
        )
    }
}

export default connect((state) => ({isLoggedIn: Boolean(state.auth.user)}), null, null, {pure: false})(App);
