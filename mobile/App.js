import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import HelloWorld from './components/hello-world';
import Auth from './components/auth'
import { events } from './fixtures'
import EventList from "./components/event-list";
import EventItem from "./components/event-item"

const eventList = Object.entries(events).map(([id, event]) => ({ id, ...event }))

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <EventItem event={eventList[0]} />
        <EventList events={eventList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    padding: 10,

  },

});
