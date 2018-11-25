import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  eventsSelector,
  loadingSelector,
  errorSelector
} from '../../ducks/events'

class EventsList extends Component {
  static propTypes = {}

  render() {
    const { events, loading, error } = this.props
    return (
      <div>
        <p style={loading ? {} : { display: 'none' }}>Loading...</p>
        <ul style={loading ? { display: 'none' } : {}}>
          {events.map((event) => (
            <li key={event.id}>
              <p>
                <strong>{event.title}</strong>
                <br />
                <strong>Where: </strong>
                {event.where}
                <br />
                <strong>When: </strong>
                {event.when}
                <br />
                <strong>URL: </strong>
                <a href={event.url}>{event.url}</a>
              </p>
            </li>
          ))}
        </ul>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    )
  }
}

export default connect((state) => ({
  events: eventsSelector(state),
  loading: loadingSelector(state),
  error: errorSelector(state)
}))(EventsList)
