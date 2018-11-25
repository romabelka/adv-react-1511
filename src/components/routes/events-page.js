import React, { Component } from 'react'
import EventList from '../events/event-list'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Events page</h2>

        <EventList />
      </div>
    )
  }
}

export default EventsPage
