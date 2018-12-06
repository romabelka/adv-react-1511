import React, { Component } from 'react'
import {ScrollView, Text, StyleSheet} from 'react-native'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <ScrollView>
                {this.props.events.map(event => (
                    <Text key = {event.id}>{event.title}</Text>
                ))}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventList