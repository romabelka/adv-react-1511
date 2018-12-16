import React, { Component } from 'react'
import {View, Text, TextInput, Button, Platform} from 'react-native'
import IsValidField from './is-valid-field'
import Loader from './common/loader'
import {observer, inject} from 'mobx-react'
import stores from '../stores'

@inject('auth')
@observer
class Auth extends Component {
    static propTypes = {

    }


    render() {
        const { email, password, error, loading } = this.props.auth

        if(loading) return <Loader />
        return (
            <View>
                <View style = {styles.container}>
                    <Text style = {{ fontSize: 40 }}>Email: </Text>
                    <TextInput value = {email} onChangeText = {this.handleEmailChange} style = {styles.input}/>
                    <IsValidField title='Email' validationName='isValidEmail' />
                </View>
                <View>
                    <Text>Password: </Text>
                    <TextInput value = {password} onChangeText = {this.handlePasswordChange}
                               secureTextEntry
                    />
                    <IsValidField title='Password' validationName='isValidPassword' />
                </View>
                <View>
                    <Button title="Sign In" onPress={this.handleSignIn}/>
                </View>
                <View>
                    <Button title="Sign Up" onPress={this.handleSignUp}/>
                </View>
                <View>
                    <Text>{error}</Text>
                </View>
            </View>
        )
    }

    handleEmailChange = (email) => stores.auth.setEmail(email)
    handlePasswordChange = (password) => stores.auth.setPassword(password)

    handleSignIn = () => {
        this.props.onSubmit('signIn')
    }

    handleSignUp = () => {
        this.props.onSubmit('signUp')
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