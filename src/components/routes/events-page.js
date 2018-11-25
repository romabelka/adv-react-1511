import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventsList from '../events/events-list'
import { loadEvents } from '../../ducks/events'

class EventsPage extends Component {
  static propTypes = {}
  componentDidMount() {
    this.props.loadEvents()
  }

  render() {
    return (
      <div>
        <h2>Events list</h2>
        <EventsList />
      </div>
    )
  }
}

export default connect(
  null,
  { loadEvents }
)(EventsPage)
