import React, { Component } from 'react'
import PersonCard from './person-card'
import { connect } from 'react-redux'
import { peopleSelector, fetchPeopleList } from '../../ducks/people'

class PeopleList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchPeopleList()
  }

  render() {
    return (
      <div>
        {this.props.people.map((person) => (
          <PersonCard person={person} key={person.id} />
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  { fetchPeopleList }
)(PeopleList)
