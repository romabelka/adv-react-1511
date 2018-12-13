import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import { events } from '../../fixtures'
import Event from '../events/event'

const eventList = Object.entries(events).map(([ id, event ]) => ({ id, ...event }))

class EventScreen extends Component {
    static propTypes = {

    };

    render() {
        return <Event event = {eventList[0]} />
    }
}

const styles = StyleSheet.create({
})

export default EventScreen