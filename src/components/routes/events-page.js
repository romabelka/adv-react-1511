import React, { Component } from 'react'
import EventsTable from '../events/virtualized-lazy-table'
import SelectedEvents from '../events/selected-events'
import PeopleList from '../people/people-list'
import Trash from '../common/trash'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <Trash />
        <PeopleList />
        <SelectedEvents />
        <EventsTable />
      </div>
    )
  }
}

export default EventsPage
