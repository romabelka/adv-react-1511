import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'

import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'

class SelectedEvents extends Component {
  static propTypes = {}

  render() {
    console.log('---', this.props.events)
    return (
      <div>
        <Table
          height={250}
          width={700}
          rowCount={this.props.events.length}
          rowHeight={30}
          rowGetter={this.rowGetter}
        >
          <Column width={200} dataKey="title" label="Title" />
          <Column width={200} dataKey="where" label="Where" />
        </Table>
      </div>
    )
  }

  rowGetter = ({ index }) => this.props.events[index]
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
