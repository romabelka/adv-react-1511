import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('auth')
@observer
class IsValidEmail extends Component {
    static propTypes = {

    };

    render() {
        const { title, validationName } = this.props
        return (
            <Text>
                {!this.props.auth[validationName] && `${title} is not valid`}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
})

export default IsValidEmail