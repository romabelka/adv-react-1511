import React, { Component } from 'react'
import EventsTable from '../events/events-table-virtualized'
import SelectedEvents from '../events/selected-events-virtualized'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <EventsTable />
        <SelectedEvents />
      </div>
    )
  }
}

export default EventsPage
