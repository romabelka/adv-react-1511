import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedEventsSelector } from '../../ducks/events'
// import SelectedEventCard from './selected-event-card'
import { List } from 'react-virtualized'

class SelectedEvents extends Component {
  static propTypes = {}
  rowRenderer = ({ key, index, style }) => {
    const { title, where } = this.props.events[index]
    return (
      <div key={key} style={style}>
        <span>{title}</span> --- <span>{where}</span>
      </div>
    )
  }

  render() {
    return (
      /**
       * Использую List просто что бы поиграть с другим типом react-virtualized
       */
      <List
        width={500}
        height={100}
        rowCount={this.props.events.length}
        rowHeight={20}
        rowRenderer={this.rowRenderer}
        style={{ border: '1px solid black' }}
      />
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
