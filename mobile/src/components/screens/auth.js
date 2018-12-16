import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import Auth from '../auth'
import stores from '../../stores'

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
        stores.navigator.follow('eventList')
    }
}

const styles = StyleSheet.create({
})

export default AuthScreen