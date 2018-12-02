import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPerson } from '../../ducks/people'
import NewPersonForm from '../people/new-person-form'
import PeopleList from '../people/people-list'
import Trash from '../common/trash'

class PersonPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Trash</h2>
        <Trash />
        <h2>People list</h2>
        <PeopleList />
        <h2>Add new person</h2>
        <NewPersonForm onSubmit={this.props.addPerson} />
      </div>
    )
  }
}

export default connect(
  null,
  { addPerson }
)(PersonPage)
