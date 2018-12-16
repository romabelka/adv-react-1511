import React, { Component } from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import EventList from '../events/event-list'
import {observer, inject} from 'mobx-react'

@inject('events')
@observer
class EventListScreen extends Component {
  static propTypes = {

  };

  componentDidMount () {
    this.props.events.loadEventsList()
  }


  render() {
      const selectData =  Object.entries(this.props.events.eventsList).map(([ id, event ]) => ({ id, ...event }))
      return (
        <View>
          {this.props.events.loading && <ActivityIndicator  size="large" color="#0000ff"/>}
          {!this.props.events.loading && <EventList events={selectData} onEventPress = {this.handleEventPress}/>}
        </View>
      )
    }

    handleEventPress = event => {
        this.props.navigation.navigate('event', { id: event.id })
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen