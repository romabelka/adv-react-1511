import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loading from '../common/loading'
import { getEvents, eventsSelector, loadingSelector } from '../../ducks/events'

class EventList extends Component {
  componentDidMount() {
    this.props.getEvents()
  }

  static propTypes = {}

  render() {
    const { loading } = this.props
    return (
      <div>
        {loading && <Loading />}
        <ul>
          {this.props.events.map((event) => (
            <li key={event.id}>
              {event.name}: {event.date}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state),
    loading: loadingSelector(state)
  }),
  { getEvents }
)(EventList)
