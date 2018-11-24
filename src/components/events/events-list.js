import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  errorSelector,
  eventsSelector,
  loadEvents,
  loadingSelector
} from '../../ducks/events'
import Loader from '../common/loader'

class EventsList extends Component {
  componentDidMount() {
    this.props.loadEvents()
  }

  render() {
    const { loading, hasError, events } = this.props
    if (hasError) return <div>Ooops, something was wrong :(</div>

    return loading ? (
      <Loader />
    ) : (
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <a href={event.url}>{event.title}</a> - {event.where}
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  (state) => {
    return {
      loading: loadingSelector(state),
      hasError: errorSelector(state),
      events: eventsSelector(state)
    }
  },
  { loadEvents }
)(EventsList)
