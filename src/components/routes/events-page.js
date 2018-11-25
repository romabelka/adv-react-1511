import React from 'react'
import { connect } from 'react-redux'
import { fetchEvents, getEventsData, loadingSelector } from '../../ducks/events'
import EventList from '../events/events-list'

class EventsPage extends React.Component {
  componentDidMount() {
    this.props.fetchEvents()
  }

  render() {
    const { events, isLoading } = this.props

    if (isLoading) return <React.Fragment> Loading </React.Fragment>
    return (
      <React.Fragment>
        <EventList events={events} />
      </React.Fragment>
    )
  }
}

export default connect(
  (state) => ({
    events: getEventsData(state),
    isLoading: loadingSelector(state)
  }),
  { fetchEvents }
)(EventsPage)
