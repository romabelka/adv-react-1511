import React from 'react'

export default ({ month, submissionDeadline, title, when, where, url }) => (
  <tr>
    <td>{title}</td>
    <td>{submissionDeadline}</td>
    <td>{month}</td>
    <td>{when}</td>
    <td>{where}</td>
    <td>
      <a href={url}>{url}</a>
    </td>
  </tr>
)
