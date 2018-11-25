import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchAllEvents,
  eventListSelector,
  loadedSelector,
  loadingSelector
} from '../../ducks/events'
import Loader from '../common/loader'

function renderItem(event) {
  return (
    <div key={event.id}>
      <div>{event.title}</div>
      <div>{event.when}</div>
      <div>{event.where}</div>
    </div>
  )
}

class EventsTable extends Component {
  componentDidMount() {
    this.props.fetchAllEvents()
  }

  render() {
    return this.props.loading ? (
      <Loader />
    ) : (
      <div>{this.props.events.map(renderItem)}</div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchAllEvents }
)(EventsTable)
