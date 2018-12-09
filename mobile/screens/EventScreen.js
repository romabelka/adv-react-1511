import React from 'react';
import Event from "../components/event";

export class EventScreen extends React.Component {
  static navigationOptions = {
    title: 'Event',
  };
  render() {
    const { navigation} = this.props;
    return (
      <Event event={navigation.state.params} />
    );
  }
}