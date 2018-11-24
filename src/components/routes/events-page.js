import React, { Component } from 'react'
import EventsList from '../events/events-list'

class EventsPage extends Component {
  render() {
    return (
      <div>
        <h2>Events</h2>
        <EventsList />
      </div>
    )
  }
}

export default EventsPage
