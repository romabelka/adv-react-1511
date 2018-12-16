import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import EventList from '../events/event-list'
import stores from '../../stores'
import {observer, inject} from 'mobx-react'

@inject('events') @observer
class EventListScreen extends Component {
    static propTypes = {

    };

    render() {
        return <EventList onEventPress = {this.handleEventPress}/>
    }

    handleEventPress = event => {
        stores.navigator.follow('event', { id: event.id })
    }
}


const styles = StyleSheet.create({
})

export default EventListScreen