import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InfiniteLoader, List } from 'react-virtualized'
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

  componentDidMount() {
    this.props.fetchAllEvents()
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise((resolve) => {
      this.props.fetchNextEvents({
        startIndex,
        stopIndex,
        callback: resolve
      })
    })
  }

  isRowLoaded = ({ index }) => {
    return !!this.props.loadedEvents[index]
  }

  rowRenderer = ({ key, index, style }) => {
    const { loadedEvents } = this.props
    const event = loadedEvents[index]

    let content

    if (event) {
      content = (
        <div>
          {event.when} <b>name:</b> {event.title}
        </div>
      )
    } else content = 'loading...'

    return (
      <div key={key} style={style} onClick={() => this.handleRowClick(event)}>
        {content}
      </div>
    )
  }

  render() {
    if (this.props.loading) return <Loader />
    return (
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
            width={500}
          />
        )}
      </InfiniteLoader>
    )
  }

  handleRowClick = (event) => {
    event && this.props.selectEvent(event.id)
  }
}

export default connect(
  (state) => ({
    allevents: eventListSelector(state),
    loadedEvents: loadedEntitiesSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchAllEvents, fetchNextEvents, selectEvent: toggleSelectEvent }
)(EventsTableVirtualized)
