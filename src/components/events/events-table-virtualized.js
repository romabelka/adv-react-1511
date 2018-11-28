import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InfiniteLoader, Table, Column } from 'react-virtualized'
import {
  fetchAllEvents,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelectEvent,
  fetchLazyEvents,
  totalCountSelector
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchLazyEvents()
  }

  render() {
    const { loading, total } = this.props
    if (loading || total === 0) return <Loader />

    return (
      <div>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={total}
        >
          {({ onRowsRendered, registerChild }) => (
            <Table
              rowCount={this.props.events.length}
              onRowsRendered={onRowsRendered}
              width={500}
              height={500}
              ref={registerChild}
              rowHeight={50}
              headerHeight={50}
              rowGetter={this.rowGetter}
              onRowClick={this.handleClick}
              overscanRowCount={1}
            >
              <Column dataKey="title" width={200} label="Title" />
              <Column dataKey="where" width={200} label="Place" />
              <Column dataKey="when" width={200} label="When" />
            </Table>
          )}
        </InfiniteLoader>
      </div>
    )
  }

  loadMoreRows = () => {
    this.props.fetchLazyEvents()
  }
  handleClick = (e) => this.props.selectEvent(e.rowData.id)
  rowGetter = ({ index }) => this.props.events[index]
  isRowLoaded = ({ index }) => !!this.props.events[index]
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    total: totalCountSelector(state)
  }),
  { fetchAllEvents, selectEvent: toggleSelectEvent, fetchLazyEvents }
)(EventsTableVirtualized)
