import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedEventsSelector } from '../../ducks/events'
import { List } from 'react-virtualized'

class SelectedEvents extends Component {
  static propTypes = {}

  render() {
    const { events } = this.props
    if (!events.length) {
      return ''
    }
    return (
      <div>
        <h3>SelectedEvents</h3>
        <List
          width={500}
          height={300}
          rowCount={events.length}
          rowHeight={50}
          rowRenderer={this.rowRenderer}
        />
      </div>
    )
  }

  rowRenderer = ({ index, key, style }) => {
    const { events } = this.props
    return (
      <div key={key} style={style}>
        <p>
          {events[index].title}
          {events[index].where}
          {events[index].when}
        </p>
      </div>
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
