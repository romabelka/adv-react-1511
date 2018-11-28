import React, { Component } from 'react'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event } = this.props
    return (
      <div
        key={event.id}
        style={{
          height: 'auto',
          marginBottom: 10,
          border: '1px solid tomato'
        }}
      >
        <h3>{event.title}</h3>
        <h4>{event.where}</h4>
      </div>
    )
  }
}

export default SelectedEventCard
