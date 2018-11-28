import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'
import {
  eventListSelector,
  countLoadingSelector,
  eventsCountSelector,
  toggleSelectEvent,
  fetchEventsCount,
  fetchLazy
} from '../../ducks/events'
import Loader from '../common/loader'
import EventsTableVirtualized from './events-table-virtualized'

export class EventsLazyTableVirtualized extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchEventsCount()
  }

  render() {
    if (this.props.loading) return <Loader />
    const { eventsCount } = this.props
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={eventsCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <EventsTableVirtualized
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowCount={eventsCount}
            rowGetter={this.rowGetter}
            onRowClick={this.handleRowClick}
          />
        )}
      </InfiniteLoader>
    )
  }

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = ({ startIndex, stopIndex }) => {
    this.props.fetchLazy(stopIndex)
  }

  handleRowClick = ({ index }) => {
    const selectedId = this.props.events[index].id
    this.props.selectEvent(selectedId)
  }

  rowGetter = ({ index }) => this.props.events[index] || {}
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: countLoadingSelector(state),
    eventsCount: eventsCountSelector(state)
  }),
  {
    fetchEventsCount,
    fetchLazy,
    selectEvent: toggleSelectEvent
  }
)(EventsLazyTableVirtualized)
