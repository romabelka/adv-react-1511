import React, { Component } from 'react'
import PersonCard from './person-card'
import { connect } from 'react-redux'
import {
  peopleSelector,
  fetchPeople,
  loadingSelector
} from '../../ducks/people'
import Loader from '../common/loader'

class PeopleList extends Component {
  static propTypes = {}

  componentWillMount() {
    console.log('wiil mount')
    this.props.fetchPeople()
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
    people: peopleSelector(state),
    loading: loadingSelector(state)
  }),
  {
    fetchPeople
  }
)(PeopleList)
