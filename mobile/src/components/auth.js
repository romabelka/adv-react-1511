import React, { Component } from 'react'
import {View, Text, TextInput, Button, Platform} from 'react-native'
import IsValidEmail from './is-valid-email'
import {observer, inject} from 'mobx-react'

@inject('auth')
@observer
class Auth extends Component {
    static propTypes = {

    };

    render() {
        const { email, password } = this.props.auth
        return (
            <View>
                <View style = {styles.container}>
                    <Text style = {{ fontSize: 40 }}>Email: </Text>
                    <TextInput value = {email} onChangeText = {this.handleEmailChange} style = {styles.input}/>
                </View>
                <IsValidEmail />
                <View>
                    <Text>Password: </Text>
                    <TextInput value = {password} onChangeText = {this.handlePasswordChange}
                               secureTextEntry
                    />
                </View>
                <View>
                    <Button title="Sign In" onPress={this.handleSignIn}/>
                </View>
            </View>
        )
    }

    handleEmailChange = (email) => stores.auth.setEmail(email)
    handlePasswordChange = (password) => stores.auth.setPassword(password)

    handleSignIn = () => {
        this.props.onSubmit()
    }
}

const styles = {
    container: {
        flexDirection: 'row'
    },
    input: {
        ...Platform.select({
            ios: {
                width: 100
            },
            android: {
                width: 200
            }
        }),
        borderBottomWidth: 1
    }
}

export default Auth