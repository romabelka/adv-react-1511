import React, { Component } from 'react'
import EventsTable from '../events/virtualized-lazy-table'
import SelectedEvents from '../events/selected-events'
import PeopleList from '../people/people-list'
import Basket from '../basket/basket'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <Basket />
        <PeopleList />
        <SelectedEvents />
        <EventsTable />
      </div>
    )
  }
}

export default EventsPage
