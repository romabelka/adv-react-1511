import React, { Component } from 'react'
import InfiniteTable from '../events/infinity-loader'
import SelectedEvents from '../events/selected-events'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <SelectedEvents />
        <InfiniteTable />
      </div>
    )
  }
}

export default EventsPage
