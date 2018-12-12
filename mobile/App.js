import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
//import HelloWorld from './components/hello-world';
import Auth from './components/auth'
import { events } from './fixtures'
import EventList from "./components/event-list";
import Event from "./components/event";

const eventList = Object.entries(events).map(([ id, event ]) => ({ id, ...event }))

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<EventList events = {eventList} />*/}
        <Event event={eventList[0]} />
      </View>
    );
  }
}

//const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "slategray",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
    alignSelf: 'stretch',
    //width: width
  }
})
