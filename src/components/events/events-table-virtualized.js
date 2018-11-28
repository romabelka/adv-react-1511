import React, { Component } from 'react'
import { Table, Column } from 'react-virtualized'

class EventsTableVirtualized extends Component {
  render() {
    return (
      <Table
        width={500}
        height={300}
        rowHeight={50}
        headerHeight={50}
        rowClassName="event-row"
        {...this.props}
      >
        <Column dataKey="title" width={200} label="Title" />
        <Column dataKey="where" width={200} label="Place" />
        <Column dataKey="when" width={200} label="When" />
      </Table>
    )
  }
}

export default EventsTableVirtualized
