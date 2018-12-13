import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import { events } from '../../../fixtures'
import Event from '../events/event'

class EventScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.id
    })

    render() {
        const { id } = this.props.navigation.state.params
        return <Event event = {events[id]} />
    }
}

const styles = StyleSheet.create({
})

export default EventScreen