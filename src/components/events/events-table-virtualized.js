import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import {
  fetchAllEvents,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelectEvent,
  fetchMoreEvents,
  BATCH_SIZE,
  loadedAllSelector
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchMoreEvents()
  }

  render() {
    const { events, loadedAll, loading } = this.props
    if (loading && !events.length) return <Loader />

    const isRowLoaded = ({ index }) => Boolean(events[index])

    return (
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        rowCount={Infinity}
        loadMoreRows={this.loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            rowCount={events.length}
            width={500}
            height={300}
            rowHeight={50}
            headerHeight={50}
            rowGetter={this.rowGetter}
            onRowClick={this.onRowClick}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
          >
            <Column dataKey="title" width={200} label="Title" />
            <Column dataKey="where" width={200} label="Place" />
            <Column dataKey="when" width={200} label="When" />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    const { events, loadedAll, loading } = this.props
    if (loadedAll || loading) return
    this.props.fetchMoreEvents(events[events.length - 1].id)
  }

  rowGetter = ({ index }) => this.props.events[index]

  onRowClick = (event) => {
    this.props.selectEvent(event.rowData.id)
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    loadedAll: loadedAllSelector(state)
  }),
  { fetchAllEvents, selectEvent: toggleSelectEvent, fetchMoreEvents }
)(EventsTableVirtualized)
