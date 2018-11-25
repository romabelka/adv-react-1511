import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import * as ducks from '../../ducks/events'

const EventsList = lazy(() => import('../events/events-list'))

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
        <Suspense fallback={'Loading...'}>
          <EventsList events={events} />
        </Suspense>
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
