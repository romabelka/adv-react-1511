import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'
import { selectedEventsSelector } from '../../ducks/events'

class SelectedEvents extends Component {
  static propTypes = {}

  render() {
    console.log('---', this.props.events)
    if (this.props.events.length === 0) {
      return null
    }
    return (
      <Table
        rowCount={this.props.events.length}
        width={500}
        height={300}
        rowHeight={50}
        headerHeight={50}
        rowGetter={this.rowGetter}
      >
        <Column dataKey="title" width={200} label="Title" />
        <Column dataKey="where" width={200} label="Place" />
        <Column dataKey="when" width={200} label="When" />
      </Table>
    )
  }

  rowGetter = ({ index }) => this.props.events[index].toJS()
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
