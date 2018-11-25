import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector } from '../../ducks/people'

class PeopleList extends Component {
  static propTypes = {}

  render() {
    return (
      <ul>
        {this.props.people.map((person) => (
          <li key={person.id}>
            {person.firstName}: {person.email}
          </li>
        ))}
      </ul>
    )
  }
}

export default connect((state) => ({
  people: peopleSelector(state)
}))(PeopleList)
