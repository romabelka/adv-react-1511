import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector } from '../../ducks/people'

class PeopleList extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        {this.props.people.map((person) => (
          <li key={person.id}>
            {person.firstName}: {person.email}
          </li>
        ))}
      </div>
    )
  }
}

export default connect((state) => ({
  people: peopleSelector(state)
}))(PeopleList)
