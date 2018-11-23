import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPerson } from '../../ducks/people'
import NewPersonForm from '../people/new-person-form'
import PeopleList from '../people/people-list'

class PersonPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Add new person</h2>
        <PeopleList />
        <NewPersonForm onSubmit={this.props.addPerson} />
      </div>
    )
  }
}

export default connect(
  null,
  { addPerson }
)(PersonPage)
