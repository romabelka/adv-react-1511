import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'
import Card from '../common/card'

class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const { event } = this.props
        return (
            <Card>
                <Text>{event.title}</Text>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventCard