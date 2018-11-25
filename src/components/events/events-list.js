import React, { Component } from 'react'

export class EventsList extends Component {
  render() {
    const { events } = this.props
    console.log(events)
    return (
      <ul>
        {events.map(([id, event]) => (
          <li key={id}>
            <h4>{event.title}</h4>
            <div>
              {event.where}
              {'. '}
              <time>{event.when}</time>
            </div>
            <a href={event.url}>Visit website</a>
          </li>
        ))}
      </ul>
    )
  }
}

EventsList.propTypes = {}

EventsList.defaultProps = {}

export default EventsList
