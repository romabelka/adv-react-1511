import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader, List } from 'react-virtualized'
import 'react-virtualized/styles.css'

import {
  fetchAllEvents,
  fetchNextEvents,
  eventListSelector,
  loadedEntitiesSelector,
  loadedSelector,
  loadingSelector,
  toggleSelectEvent
} from '../../ducks/events'

import Loader from '../common/loader'

export class EventsTableVirtualized extends Component {
  static propTypes = {}

  _loadMoreRowsStartIndex = -1
  _loadMoreRowsStopIndex = -1

  componentDidMount() {
    this.props.fetchAllEvents()
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    this._loadMoreRowsStartIndex = startIndex
    this._loadMoreRowsStopIndex = stopIndex

    return Promise.resolve(
      this.props.fetchNextEvents({
        startIndex,
        stopIndex
      })
    )
  }

  isRowLoaded = ({ index }) => {
    console.log('isloaded', index, !!this.props.loadedevents[index])
    return !!this.props.loadedevents[index]
  }

  rowRenderer = ({ key, index, style }) => {
    const { loadedevents } = this.props

    return (
      <div key={key} style={style}>
        {loadedevents[index] ? loadedevents[index].when : 'loading...'}
      </div>
    )
  }

  render() {
    if (this.props.loading) return <Loader />
    return (
      <>
        <InfiniteLoader
          loadMoreRows={this.loadMoreRows}
          isRowLoaded={this.isRowLoaded}
          rowCount={this.props.allevents.length}
        >
          {({ onRowsRendered, registerChild }) => (
            <List
              height={200}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              rowCount={this.props.allevents.length}
              rowHeight={20}
              rowRenderer={this.rowRenderer}
              width={300}
            />
          )}
        </InfiniteLoader>
        <Table
          rowCount={this.props.allevents.length}
          width={500}
          height={300}
          rowHeight={50}
          headerHeight={50}
          rowGetter={this.rowGetter}
          onRowClick={this.handleRowClick}
        >
          <Column dataKey="title" width={200} label="Title" />
          <Column dataKey="where" width={200} label="Place" />
          <Column dataKey="when" width={200} label="When" />
        </Table>
      </>
    )
  }

  handleRowClick = ({ rowData: event }) => {
    console.log(event)
    this.props.selectEvent(event.id)
  }

  rowGetter = ({ index }) => this.props.allevents[index]
}

export default connect(
  (state) => ({
    allevents: eventListSelector(state),
    loadedevents: loadedEntitiesSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchAllEvents, fetchNextEvents, selectEvent: toggleSelectEvent }
)(EventsTableVirtualized)
