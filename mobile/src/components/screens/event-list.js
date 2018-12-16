import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import { events } from '../../../fixtures'
import EventList from '../events/event-list'
import withRouterProvider from '../decorators/with-router-provider'

const eventList = Object.entries(events).map(([ id, event ]) => ({ id, ...event }))

class EventListScreen extends Component {
    static propTypes = {

    };

    render() {
        return <EventList events={eventList} onEventPress = {this.handleEventPress}/>
    }

    handleEventPress = event => {
        this.props.setScreen('event', { id: event.id })
    }
}

const styles = StyleSheet.create({
})

export default withRouterProvider(EventListScreen)