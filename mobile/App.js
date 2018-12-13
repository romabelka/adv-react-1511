import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
//import HelloWorld from './components/hello-world';
//import Auth from './components/auth'
import { events } from './fixtures'
//import EventList from './components/events/event-list'
import Event from './components/events/event'

const eventList = Object.entries(events).map(([ id, event ]) => ({ id, ...event }))

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Event event = {eventList[0]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
