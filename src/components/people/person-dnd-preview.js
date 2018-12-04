import React, { Component } from 'react'
import { connect } from 'react-redux'
import { personSelector } from '../../ducks/people'

class PersonDndPreview extends Component {
  static propTypes = {}

  render() {
    const { person } = this.props
    return <div>{person.email}</div>
  }
}

export default connect((state, ownProps) => ({
  person: personSelector(state, ownProps)
}))(PersonDndPreview)
