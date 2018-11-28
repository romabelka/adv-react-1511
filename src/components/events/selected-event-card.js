import React, { Component } from 'react'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event } = this.props
    return (
      <div
        style={{
          width: 400,
          border: '1px solid black',
          padding: '0 10px',
          lineHeight: 3
        }}
      >
        <h3>{event.title}</h3>
        <h4>{event.where}</h4>
      </div>
    )
  }
}

export default SelectedEventCard
