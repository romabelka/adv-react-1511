import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventSelector } from '../../ducks/events'

class EventDndPreview extends Component {
  static propTypes = {}

  render() {
    const { event } = this.props
    return <div>{event.title}</div>
  }
}

export default connect((state, ownProps) => ({
  event: eventSelector(state, ownProps)
}))(EventDndPreview)
