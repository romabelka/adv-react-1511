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

  isRowLoaded = ({ index }) => {
    return !!this.props.events[index]
  }

  render() {
    // loadMoreRows требует, что бы функция возвращала промиз, но я запускаю action creator который возвращает обычный объект. Я не знаю как не использовать здесь сайд эффект(
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={chunkLoading}
        rowCount={this.props.events.length + 1}
        minimumBatchSize={CHUNK_LIMIT}
      >
        {({ onRowsRendered, registerChild }) => (
          <EventsTableVirtualized
            onRowsRendered={onRowsRendered}
            registerChild={registerChild}
          />
        )}
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
