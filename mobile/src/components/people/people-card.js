import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'
import Card from '../common/card'

class PeopleCard extends Component {
    static propTypes = {

    };

    render() {
        const { person } = this.props
        return (
            <Card>
                <Text>{person.firstName} {person.lastName}</Text>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
})

export default PeopleCard