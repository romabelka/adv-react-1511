import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader, AutoSizer } from 'react-virtualized'
import {
  lazyLoadingEvents,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelectEvent,
  EVENTS_LOADING_LIMIT
} from '../../ducks/events'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.lazyLoadingEvents()
  }

  isRowLoaded = ({ index }) => {
    const { events } = this.props
    return !!events[index]
  }

  loadMoreRows = () => {
    this.props.lazyLoadingEvents()
  }

  render() {
    const { loaded, events } = this.props
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={loaded ? events.length : events.length + 1}
        threshold={EVENTS_LOADING_LIMIT}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                rowCount={events.length}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                width={width}
                height={300}
                rowHeight={50}
                headerHeight={50}
                rowGetter={this.rowGetter}
                onRowClick={this.selectEvent}
              >
                <Column dataKey="title" width={200} label="Title" />
                <Column dataKey="where" width={200} label="Place" />
                <Column dataKey="when" width={200} label="When" />
              </Table>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    )
  }

  selectEvent = ({ rowData: { id } }) => this.props.selectEvent(id)
  rowGetter = ({ index }) => this.props.events[index]
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { lazyLoadingEvents, selectEvent: toggleSelectEvent }
)(EventsTableVirtualized)
