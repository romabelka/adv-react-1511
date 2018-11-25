import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PersonPage from './person-page'
import * as ducks from '../../ducks/events'

class EventsPage extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.loadEvents()
  }

  render() {
    return (
      <div>
        <h1>Events Page</h1>
        <Route path="/admin/people" component={PersonPage} />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: ducks.loadingSelector(state),
    events: ducks.eventsSelector(state)
  }),
  {
    loadEvents: ducks.loadEvents
  }
)(EventsPage)
