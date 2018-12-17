import React, { Component } from 'react'
import Auth from '../auth'

class AuthScreen extends Component {
    static propTypes = {

    }

    render() {
        return <Auth onSubmit = {this.handleSubmit}/>
    }

    handleSubmit = () => {
        this.props.navigation.navigate('lists')
    }
}

export default AuthScreen