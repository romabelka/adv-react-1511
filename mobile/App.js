import React from 'react';
import { StyleSheet, Button, View, ScrollView } from 'react-native'
//import HelloWorld from './components/hello-world';
import Auth from './components/auth'
import { events } from './fixtures'
import EventList from "./components/event-list";
import EventsSectionList from './components/event-section-list'

const eventList = Object.entries(events).map(([ id, event ]) => ({ id, ...event }))

export default class App extends React.Component {

  state = {
    newEventList : false,
  }

  toggleEventList = () => {
    this.setState({newEventList: !this.state.newEventList})
  }

  render() {

    const title = this.state.newEventList ? 'close events list' : 'open events list'

    return (
      <ScrollView>
        <View style={{paddingTop: 50}}>
          <Button
            style={{
              fontSize: 20
            }}
            onPress={this.toggleEventList}
            title={title}
          />
        </View>
      <View style={styles.container}>

          {this.state.newEventList && <EventsSectionList events = {eventList}/> }
      </View>
      </ScrollView>
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
