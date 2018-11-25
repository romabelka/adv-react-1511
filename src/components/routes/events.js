import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  isEventsLoadingSelector,
  eventsSelector,
  loadEvents,
  errorSelector
} from '../../ducks/events'

class EventsPage extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.loadEvents()
  }

  render() {
    return (
      <div>
        <h1>Events</h1>
        {this.props.loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {this.props.events.map((event, i) => (
              <li key={i}>{event.title}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      loading: isEventsLoadingSelector(state),
      error: errorSelector(state),
      events: eventsSelector(state)
    }
  },
  { loadEvents }
)(EventsPage)
