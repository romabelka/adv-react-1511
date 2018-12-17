import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('auth')
@observer
class IsValidEmail extends Component {
    static propTypes = {

    };

    render() {
        return (
            <Text>
                {this.props.auth.isValidEmail.toString()}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
})

export default IsValidEmail