import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import Auth from '../auth'
import withRouterProvider from '../decorators/with-router-provider'
import stores from '../../stores'
import {inject, observer} from 'mobx-react'

@inject('auth')
@observer
class AuthScreen extends Component {
    static propTypes = {

    }

    componentWillMount(){
        console.log('componentWillMount')
        const { user } = this.props.auth
        if(user) this.props.setScreen('eventList')
    }

    componentWillUpdate(){
        console.log('componentWillUpdate')
        const { user } = this.props.auth
        if(user) this.props.setScreen('eventList')
    }

    static navigationOptions = {
        title: 'Auth Screen'
    }

    render() {
        const { user } = this.props.auth //componentWillUpdate will calling only if { user } is here

        return <Auth onSubmit = {this.handleSubmit}/>
    }

    handleSubmit = (action) => {
        stores.auth.authorize(action)
    }
}

const styles = StyleSheet.create({
})

export default withRouterProvider(AuthScreen)