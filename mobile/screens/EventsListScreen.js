import React from 'react';
import { events } from '../fixtures'
import EventList from "../components/event-list";

const eventList = Object.entries(events).map(([ id, event ]) => ({ id, ...event }))

export class EventsListScreen extends React.Component {
  static navigationOptions = {
    title: 'Events list',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <EventList navigate = {navigate} events = {eventList} />
    );
  }
}