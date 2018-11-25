import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadingSelector,
  fetchEvents,
  eventListSelector
} from '../../ducks/events'
import Loader from '../common/loader'

class EventsList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchEvents()
  }

  getEvent = (event) => (
    <tr key={event.id}>
      <td>{event.title}</td>
      <td>{event.url}</td>
      <td>{event.when}</td>
      <td>{event.where}</td>
    </tr>
  )

  getEvents = () => this.props.events.map(this.getEvent)

  render() {
    if (this.props.loading) return <Loader />
    return (
      <table>
        <tbody>{this.getEvents()}</tbody>
      </table>
    )
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state)
  }),
  { fetchEvents }
)(EventsList)
