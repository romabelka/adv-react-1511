import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventsSelector, loadingSelector } from '../../ducks/events'
import Loader from '../common/loader.js'

class EventsList extends Component {
  static propTypes = {}

  render() {
    const { events, isLoading } = this.props
    return (
      <ul>
        {!isLoading ? (
          this.props.events.map((event) => (
            <li key={event.id}>{event.title}</li>
          ))
        ) : (
          <Loader />
        )}
      </ul>
    )
  }
}

export default connect((state) => ({
  events: eventsSelector(state),
  isLoading: loadingSelector(state)
}))(EventsList)
