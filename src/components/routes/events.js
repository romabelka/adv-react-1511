import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventsList from '../events/events-list'
import * as ducks from '../../ducks/events'

class EventsPage extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.loadEvents()
  }

  render() {
    const { loading, events } = this.props
    return (
      <div>
        <h1>Events Page</h1>
        {loading ? 'Loading' : <EventsList events={events} />}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: ducks.loadingSelector(state),
    events: ducks.eventsSelector(state)
  }),
  {
    loadEvents: ducks.loadEvents
  }
)(EventsPage)
