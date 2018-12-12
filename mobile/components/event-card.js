import React, { Component } from 'react'
import { View, Text, Button , Alert} from 'react-native'
import eventMocks from '../fixtures'

const event = eventMocks.events['-LCjHEYyUS4HtMWCkVrm']

class EventCard extends Component {
  static propTypes = {

  };

  static defaultProps = {
    event: {
      id: '-LCjHEYyUS4HtMWCkVrm',
      ...event
    }
  }

  handlePress = () => {
    Alert.alert(
      'card delete confirmation',
      'are you sure you want to delete this ? ',
      [
        {text: 'yes', onPress: () => console.log('deleted!')},
        {text: 'no', onPress: () => console.log('Cancel'), style: 'cancel'},
      ],
      { cancelable: true }
    )
  }

  render() {
    const {event : {title, when, where}} = this.props
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{width: 200, minHeight: 30, backgroundColor: 'powderblue'}}>
          <Text>{title}</Text>
        </View>
        <View style={{width: 200,minHeight: 30,  backgroundColor: 'skyblue'}}>
          <Text>{when}</Text>
        </View>
        <View style={{width: 200,minHeight: 30,  backgroundColor: 'steelblue'}}>
          <Text>{where}</Text>
        </View>



        <Button title={"delete me"} onPress={this.handlePress}/>
      </View>
    )
  }
}

export default EventCard