import React, { Component } from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import Event from '../events/event'
import {observer, inject} from 'mobx-react'

@inject('events')
@observer
class EventScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.id
    })


    componentDidMount () {
        this.props.events.loadEventsList()
    }

    render() {
        const { id } = this.props.navigation.state.params
        const currentEvent =  Object.entries(this.props.events.eventsList).map(([ id, event ]) => ({ id, ...event })).filter((event) => {
          return event.id === id
        })[0]
        return (
          <View>
            {this.props.events.loading && <ActivityIndicator  size="large" color="#0000ff"/>}
            {!this.props.events.loading && <Event event = {currentEvent} />}
          </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventScreen