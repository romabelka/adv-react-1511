import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventItem from './eventItem'
import WithLoader from './../common/withLoader'
import {
  eventsSelector,
  loadingSelector,
  loadEventsRequest
} from '../../ducks/events'

class EventsList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.loadEventsRequest()
  }

  render() {
    const { events, loading } = this.props

    return (
      <div>
        <WithLoader isLoading={loading}>
          <table>
            <thead align="left">
              <th>title</th>
              <th>submissionDeadline</th>
              <th>month</th>
              <th>when</th>
              <th>where</th>
              <th>url</th>
            </thead>
            <tbody>
              {events.map((e) => (
                <EventItem key={e.id} {...e} />
              ))}
            </tbody>
          </table>
        </WithLoader>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state),
    loading: loadingSelector(state)
  }),
  { loadEventsRequest }
)(EventsList)
