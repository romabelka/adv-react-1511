import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'

class SelectedEvents extends Component {
  static propTypes = {}

  componentWillUpdate() {
    this.refs.forceUpdateGrid()
  }

  render() {
    return (
      <div>
        <List
          ref={(ref) => (this.refs = ref)}
          width={400}
          height={300}
          rowCount={this.props.events.length}
          rowHeight={150}
          rowRenderer={this.rowRenderer}
        />
      </div>
    )
  }

  rowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <SelectedEventCard event={this.props.events[index]} />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    events: selectedEventsSelector(state)
  }),
  null,
  null,
  { pure: false }
)(SelectedEvents)
