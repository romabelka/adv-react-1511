import React, { Component } from 'react'
import PeopleForm from '../people/people-form'
import { connect } from 'react-redux'
import { createPeople } from '../../ducks/people'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin page</h1>
        <PeopleForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
  handleSubmit = data => this.props.createPeople(data)
}

export default connect(
  null,
  { createPeople }
)(AdminPage)
