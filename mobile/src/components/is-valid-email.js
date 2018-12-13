import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'
import {observer} from 'mobx-react'
import stores from '../stores'

@observer
class IsValidEmail extends Component {
    static propTypes = {

    };

    render() {
        console.log('---', 123)
        return (
            <Text>
                {stores.auth.isValidEmail.toString()}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
})

export default IsValidEmail