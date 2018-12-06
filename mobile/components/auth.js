import React, { Component } from 'react'
import {View, Text, TextInput, Button, Platform} from 'react-native'

class Auth extends Component {
    static propTypes = {

    };

    state = {
        email: '',
        password: ''
    }

    render() {
        const { email, password } = this.state
        return (
            <View>
                <View style = {styles.container}>
                    <Text style = {{ fontSize: 40 }}>Email: </Text>
                    <TextInput value = {email} onChangeText = {this.handleEmailChange} style = {styles.input}/>
                </View>
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

    handleEmailChange = (email) => this.setState({ email })
    handlePasswordChange = (password) => this.setState({ password })

    handleSignIn = () => console.log('---', 123, this.state)
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