import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'

class SelectedEvents extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        {this.props.events.map((event) => (
          <SelectedEventCard event={event} key={event.id} />
        ))}
      </div>
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
