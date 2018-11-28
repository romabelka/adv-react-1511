import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'
import { List } from 'react-virtualized'

export class SelectedEventsVirtualized extends Component {
  static propTypes = {}

  render() {
    const { events } = this.props

    return (
      <List
        rowCount={events.length}
        height={360}
        width={500}
        rowHeight={180}
        rowRenderer={this.rowRenderer}
      />
    )
  }

  rowRenderer = ({ index }) => {
    const event = this.props.events[index]

    return <SelectedEventCard event={event} key={event.id} />
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEventsVirtualized)
