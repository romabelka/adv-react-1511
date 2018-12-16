import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'
import Card from '../common/card'

class PersonCard extends Component {
    static propTypes = {

    };

    render() {
        const { person } = this.props
        return (
            <Card>
                <Text>{person.email}</Text>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
})

export default PersonCard