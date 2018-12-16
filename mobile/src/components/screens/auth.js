import React, { Component } from 'react'
import {StyleSheet, ActivityIndicator, View} from 'react-native'
import Auth from '../auth'
import { when } from 'mobx'
import {observer, inject} from 'mobx-react'

@inject('auth')
@observer
class AuthScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'Auth Screen'
    }

    componentDidUpdate() {
      when(
        () => this.props.auth.isSuccess,
        () => {
          this.props.navigation.navigate('eventList')
        }
      )
    }

    render() {
        const {loading} = this.props.auth;
        return (
          <View>
            {this.props.auth.loading && <ActivityIndicator  size="large" color="#0000ff"/>}
            {!this.props.auth.loading && <Auth onSubmit = {this.handleSubmit}/>}
          </View>
        )
    }

    handleSubmit = () => {
      const { email, password, signIn, isSuccess } = this.props.auth;
      signIn(email, password)
    }
}

const styles = StyleSheet.create({
})

export default AuthScreen