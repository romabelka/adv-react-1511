import React, { Component } from 'react'
import {View, Text, TextInput, Button, Platform} from 'react-native'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

@observer
class Auth extends Component {
    static propTypes = {

    };

    @observable email = ''
    @observable password = ''

    render() {
        const { email, password } = this
        console.log('---', email, password)
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

    handleEmailChange = (email) => this.email = email
    handlePasswordChange = (password) => this.password = password

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