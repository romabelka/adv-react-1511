import React, { Component } from 'react'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event, style } = this.props
    return (
      <div
        style={{ ...style, width: 400, height: 150, border: '1px solid black' }}
      >
        <h3>{event.title}</h3>
        <h4>{event.where}</h4>
      </div>
    )
  }
}

export default SelectedEventCard
