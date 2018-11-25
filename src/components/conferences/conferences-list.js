import React, { Component } from 'react'
import { connect } from 'react-redux'
import { conferencesSelector } from '../../ducks/conferences'

class ConferencesList extends Component {
  static propTypes = {}

  loadConferences = () => {
    this.props.loadConferences()

    return <div>Loading</div>
  }

  render() {
    return this.props.conferences.length ? (
      <ul>
        {this.props.conferences.map((conf) => (
          <li key={conf.id}>
            {conf.title} {conf.url} {conf.where} {conf.when} {conf.month}{' '}
            {conf.submissionDeadline}
          </li>
        ))}
      </ul>
    ) : (
      this.loadConferences()
    )
  }
}

export default connect((state) => ({
  conferences: conferencesSelector(state)
}))(ConferencesList)
