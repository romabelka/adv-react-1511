import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'

class SelectedEvents extends Component {
  static propTypes = {}

  componentDidUpdate() {
    this.list.forceUpdateGrid()
  }

  render() {
    return (
      <List
        ref={this.setListRef}
        width={400}
        height={300}
        rowCount={this.props.events.length}
        rowHeight={150}
        rowRenderer={this.rowRenderer}
      />
    )
  }

  setListRef = (ref) => (this.list = ref)

  rowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      <SelectedEventCard event={this.props.events[index]} />
    </div>
  )
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
