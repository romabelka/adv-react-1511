import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAll, eventListSelector, moduleName } from '../../ducks/events'
import Loader from '../common/loader'

class EventList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchAll()
  }

  render() {
    if (this.props.loading) return <Loader />
    return (
      <ul>
        {this.props.events.map((event) => (
          <li key={event.uid}>
            <b>title:</b> {event.title}
            <br />
            <b>where:</b> {event.where}
            <br />
            <b>month:</b> {event.month}
            <br />
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: state[moduleName].loading
  }),
  { fetchAll }
)(EventList)
