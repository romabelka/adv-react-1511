import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import Event from '../events/event'
import {observer, inject} from 'mobx-react'

@inject('events') @observer
class EventScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.id
    })

    render() {
        const { id } = this.props.navigation.state.params
        return <Event event = {this.props.events.events[id]} />
    }
}

const styles = StyleSheet.create({
})

export default EventScreen