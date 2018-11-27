import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import {
  fetchAllEvents,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelectEvent,
  fetchLazy
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
  static propTypes = {}

  componentDidMount() {
    // this.props.fetchAllEvents()
    this.props.fetchLazy()
  }

  render() {
    const { loaded, events } = this.props
    if (this.props.loading) return <Loader />
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={loaded ? events.length : events.length + 1}
      >
        {({ onRowsRendered, registerChild }) => (
          <div>
            <Table
              ref={registerChild}
              rowCount={events.length}
              width={500}
              height={300}
              rowHeight={50}
              headerHeight={50}
              overscanRowCount={10}
              onRowsRendered={onRowsRendered}
              rowGetter={this.rowGetter}
              onRowClick={this.handleRowClick}
            >
              <Column dataKey="title" width={200} label="Title" />
              <Column dataKey="where" width={200} label="Place" />
              <Column dataKey="when" width={200} label="When" />
            </Table>
            <button onClick={this.props.fetchLazy}>GO</button>
          </div>
        )}
      </InfiniteLoader>
    )
  }

  isRowLoaded = ({ index }) => {
    console.warn('isRowLoaded', index < this.props.events.length)
    return index < this.props.events.length
  }

  rowGetter = ({ index }) => this.props.events[index]

  loadMoreRows = () => {
    console.warn('LOAD MORE...')
    this.props.fetchLazy()
  }

  handleRowClick = ({ rowData }) => {
    this.props.selectEvent(rowData.id)
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchAllEvents, selectEvent: toggleSelectEvent, fetchLazy }
)(EventsTableVirtualized)
