import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import EventList from '../events/event-list'
import Loader from '../common/loader'
import withRouterProvider from '../decorators/with-router-provider'
import {inject, observer} from 'mobx-react'
import stores from '../../stores'

@inject('event')
@observer
class EventListScreen extends Component {
    static propTypes = {

    }

    componentWillMount(){
        const { loaded } = this.props.event

        if(!loaded) stores.event.getEvents()
    }

    render() {
        const { events, loading } = this.props.event
        const eventList = stores.event.selectEventsAsArray() 

        if(loading) return <Loader />
        return <EventList events={eventList} onEventPress = {this.handleEventPress}/>
    }

    handleEventPress = event => {
        this.props.setScreen('event', { id: event.id })
    }
}

const styles = StyleSheet.create({
})

export default withRouterProvider(EventListScreen)