import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'
import 'react-virtualized/styles.css'

class SelectedEventsVirtualized extends Component {
  static propTypes = {}

  render() {
    return (
      <List
        width={500}
        height={200}
        rowCount={this.props.events.length}
        rowHeight={152}
        rowRenderer={this.rowRender}
      />
    )
  }

  rowRender = ({ index, key, style }) => {
    const event = this.props.events[index]
    return <SelectedEventCard key={key} event={event} style={style} />
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEventsVirtualized)
