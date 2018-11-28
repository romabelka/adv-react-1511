import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import {
  loadingSelector,
  loadedSelector,
  eventListSelector,
  fetchLazy,
  toggleSelectEvent
} from '../../ducks/events'
import 'react-virtualized/styles.css'

export class EventLazyTable extends Component {
  componentDidMount() {
    this.props.fetchLazy()
  }

  render() {
    const { loaded, events } = this.props
    const remoteRowCount = loaded ? events.length : events.length + 1
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={remoteRowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            width={500}
            height={300}
            headerHeight={50}
            rowHeight={50}
            rowCount={events.length}
            rowGetter={this.rowGetter}
            onRowClick={this.handlerRowOnClick}
            onRowsRendered={onRowsRendered}
          >
            <Column dataKey="title" width={200} label="Title" />
            <Column dataKey="where" width={200} label="Place" />
            <Column dataKey="when" width={200} label="When" />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  handlerRowOnClick = (e) => this.props.toggleSelectEvent(e.rowData.id)

  rowGetter = ({ index }) => this.props.events[index]

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = () => {
    this.props.fetchLazy()
    return Promise.resolve()
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  {
    fetchLazy,
    toggleSelectEvent
  }
)(EventLazyTable)
