import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableRow from './events-table-row'
import {
  loadingSelector,
  loadedSelector,
  fetchLazy,
  eventListSelector,
  toggleSelectEvent
} from '../../ducks/events'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'

export class EventLazyTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchLazy()
  }

  render() {
    const { loaded, events, isDragging } = this.props
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
            //onRowClick={this.handleSelect}
            onRowsRendered={onRowsRendered}
            rowRenderer={this.rowRenderer}
            rowClassName="test__event_table_row"
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

  rowRenderer = (props) => {
    const { index, className } = props
    const event = this.rowGetter(props)
    return (
      <TableRow
        event={event}
        className={className}
        key={index}
        onClick={this.handleSelect}
      />
    )
  }

  handleSelect = (id) => this.props.selectEvent(id)
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchLazy, selectEvent: toggleSelectEvent }
)(EventLazyTable)
