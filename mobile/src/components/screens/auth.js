import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import Auth from '../auth'
import withRouterProvider from '../decorators/with-router-provider'

class AuthScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'Auth Screen'
    }

    render() {
        return <Auth onSubmit = {this.handleSubmit}/>
    }

    handleSubmit = () => {
        this.props.setScreen('eventList')
    }
}

const styles = StyleSheet.create({
})

export default withRouterProvider(AuthScreen)