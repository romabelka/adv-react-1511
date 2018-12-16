import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import Event from '../events/event'
import {inject, observer} from 'mobx-react'

@inject('event')
@inject('router')
@observer
class EventScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.id
    })

    render() {

        const { events } = this.props.event
        const { screen: {params: { id } } } = this.props.router

        return <Event event = {events[id]} />
    }
}

const styles = StyleSheet.create({
})

export default EventScreen