import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import { events } from '../../../fixtures'
import EventList from '../events/event-list'

const eventList = Object.entries(events).map(([ id, event ]) => ({ id, ...event }))

class EventListScreen extends Component {
    static propTypes = {

    };

    render() {
        return <EventList events={eventList} onEventPress = {this.handleEventPress}/>
    }

    handleEventPress = event => {
        this.props.navigation.navigate('event', { id: event.id })
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen