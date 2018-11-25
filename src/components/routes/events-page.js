import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEvents } from '../../ducks/events'
import EventsList from '../events/events-list.js'

class EventsPage extends Component {
  componentDidMount() {
    this.props.getEvents()
  }

  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Events Page</h1>
        <EventsList />
      </div>
    )
  }
}

export default connect(
  null,
  {
    getEvents
  }
)(EventsPage)
