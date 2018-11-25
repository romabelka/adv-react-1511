import React from 'react'
import EventItem from './events-item'

const EventList = ({ events }) => (
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>month</th>
        <th>submissionDeadline</th>
        <th>title</th>
        <th>url</th>
        <th>when</th>
        <th>where</th>
      </tr>
    </thead>
    <tbody>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </tbody>
  </table>
)

export default EventList
