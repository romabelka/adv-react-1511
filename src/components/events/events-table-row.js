import React, { Component } from 'react'

class EventTableRow extends Component {
  static propTypes = {}

  render() {
    const { event } = this.props
    return (
      <tr className="test--events-table__row">
        <td>{event.title}</td>
        <td>{event.when}</td>
        <td>{event.where}</td>
      </tr>
    )
  }
}

export default EventTableRow
