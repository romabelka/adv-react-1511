import React, { Component } from 'react'
import EventsList from '../events/eventsList'

class EventsPage extends Component {
  static propTypes = {}

  componentDidMount() {}

  render() {
    return (
      <div>
        <h2>Events:</h2>
        <EventsList />
      </div>
    )
  }
}

export default EventsPage
