import React, { Component } from 'react'
import EventsTable from '../events/events-table-virtualized'
import SelectedEvents from '../events/selected-events-virtualized'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <SelectedEvents />
        <EventsTable />
      </div>
    )
  }
}

export default EventsPage
