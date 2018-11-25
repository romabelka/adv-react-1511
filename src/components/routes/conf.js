import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { loadConferences } from '../../ducks/conferences'
import ConferencesList from '../conferences/conferences-list'

class ConferencesPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Conf Page</h1>
        <ConferencesList loadConferences={this.props.loadConferences} />
      </div>
    )
  }
}

export default connect(
  null,
  { loadConferences }
)(ConferencesPage)
