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
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchLazy()
  }

  render() {
    const { events, loaded, loading } = this.props
    // if (loading) return <Loader />
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        rowCount={loaded ? events.length : events.length + 1}
        loadMoreRows={this.loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            rowCount={events.length}
            width={500}
            height={300}
            rowHeight={50}
            headerHeight={50}
            rowGetter={this.rowGetter}
            onRowClick={this.handleRowClick}
            onRowsRendered={onRowsRendered}
            // rowRenderer={this.getRowRenderer}
          >
            <Column dataKey="title" width={200} label="Title" />
            <Column dataKey="where" width={200} label="Place" />
            <Column dataKey="when" width={200} label="When" />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  rowGetter = ({ index }) => this.props.events[index]

  handleRowClick = ({ rowData }) => this.props.selectEvent(rowData.id)

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = () => {
    console.log('--- LOAD')
    this.props.fetchLazy()
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
