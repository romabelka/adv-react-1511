import React, { Component } from 'react'
import PersonCard from './person-card'
import Loader from '../common/loader'
import { connect } from 'react-redux'
import {
  peopleSelector,
  loadingSelector,
  fetchAllPeople
} from '../../ducks/people'

class PeopleList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchAllPeople()
  }

  render() {
    if (this.props.loading) return <Loader />
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
    loading: loadingSelector(state),
    people: peopleSelector(state)
  }),
  { fetchAllPeople }
)(PeopleList)
