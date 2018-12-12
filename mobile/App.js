import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import HelloWorld from './components/hello-world';
import Auth from './components/auth'
import { events } from './fixtures'
import EventList from "./components/event-list";

const eventList = Object.entries(events).map(([ id, event ]) => ({ id, ...event }))

const sections = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
  title: letter,
  data: eventList.filter((event) => event.title.substring(0,1).toUpperCase() === letter)
}))

export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <EventList sections = {sections} />
      </View>
    );
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
