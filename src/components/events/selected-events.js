import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'
import { List } from 'react-virtualized'

class SelectedEvents extends Component {
  static propTypes = {}

  rowRenderer = ({ index }) => {
    const event = this.props.events[index]
    return <SelectedEventCard event={event} key={event.id} />
  }

  render() {
    const { events } = this.props
    return (
      <List
        rowCount={events.length}
        height={200}
        width={500}
        rowHeight={180}
        rowRenderer={this.rowRenderer}
      />
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
