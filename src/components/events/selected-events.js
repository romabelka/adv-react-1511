import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'

class SelectedEvents extends Component {
  static propTypes = {}

  render() {
    console.log('---', this.props.events)
    return (
      <List
        width={400}
        height={300}
        rowCount={this.props.events.length}
        rowHeight={150}
        rowRenderer={this.rowRenderer}
      />
    )
  }

  rowRenderer = ({ key, index }) => (
    <SelectedEventCard event={this.props.events[index]} key={key} />
  )
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
