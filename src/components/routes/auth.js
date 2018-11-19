import React, { Component } from 'react'
import SignInForm from '../auth/sign-in-form'

class AuthPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Auth Page</h1>
                <SignInForm onSubmit = {this.handleSignIn}/>
            </div>
        )
    }

    handleSignIn = ({ email, password }) => console.log('---', 'sign in', email, password)
}

export default AuthPage