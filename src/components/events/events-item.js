import React from 'react'

const EventItem = ({ event }) => {
  const { id, month, submissionDeadline, title, url, when, where } = event
  return (
    <tr>
      <td>{id}</td>
      <td>{month}</td>
      <td>{submissionDeadline}</td>
      <td>{title}</td>
      <td>{url}</td>
      <td>{when}</td>
      <td>{where}</td>
    </tr>
  )
}

export default EventItem
