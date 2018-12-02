import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadingSelector,
  loadedSelector,
  fetchLazy,
  eventListSelector,
  toggleSelectEvent
} from '../../ducks/events'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'
import EventTableRow from './events-table-row'

export class EventLazyTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchLazy()
  }

  render() {
    const { loaded, events } = this.props
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
            rowGetter={this.rowGetter}
            rowHeight={40}
            headerHeight={50}
            overscanRowCount={1}
            width={600}
            height={300}
            onRowClick={this.handleSelect}
            onRowsRendered={onRowsRendered}
            rowClassName="test__event_table_row"
            rowRenderer={this.useRowRenderer}
          >
            <Column dataKey="title" width={200} label="Title" />
            <Column dataKey="where" width={200} label="Place" />
            <Column dataKey="when" width={200} label="When" />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = () => {
    this.props.fetchLazy()
  }

  rowGetter = ({ index }) => this.props.events[index]

  handleSelect = ({ rowData }) => this.props.selectEvent(rowData.id)

  useRowRenderer = (row) => <EventTableRow {...row} /> //
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchLazy, selectEvent: toggleSelectEvent }
)(EventLazyTable)
