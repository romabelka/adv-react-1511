import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'
import { List } from 'react-virtualized'
import 'react-virtualized/styles.css'

class SelectedEvents extends Component {
  static propTypes = {}

  render() {
    const { events } = this.props
    console.log('---', events)
    return (
      <List
        rowCount={events.length}
        rowHeight={150}
        height={300}
        width={300}
        rowRenderer={this.rowRenderer}
      />
    )
  }
  rowRenderer = ({ index, key, style }) => (
    <SelectedEventCard
      event={this.props.events[index]}
      key={key}
      style={style}
    />
  )
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
