import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { InfiniteLoader } from 'react-virtualized'
import {
  chunkLoading,
  eventListSelector,
  CHUNK_LIMIT
} from '../../ducks/events'

import EventsTableVirtualized from './events-table-virtualized'

export class InfiniteTable extends Component {
  static propTypes = {}
  static defaultProps = {}

  isRowLoaded = ({ index }) => !!this.props.events[index]

  render() {
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={chunkLoading}
        rowCount={this.props.events.length}
        minimumBatchSize={CHUNK_LIMIT}
      >
        {({ onRowsRendered, registerChild }) => <EventsTableVirtualized />}
      </InfiniteLoader>
    )
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state)
  }),
  { chunkLoading }
)(InfiniteTable)
