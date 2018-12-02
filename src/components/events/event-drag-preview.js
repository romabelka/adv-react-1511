import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventListSelector } from '../../ducks/events'

function EventDragPreview({ event }) {
  return <div>{event.title}</div>
}

export default connect((state, props) => ({
  event: eventListSelector(state, props).find((e) => e.id === props.id)
}))(EventDragPreview)
