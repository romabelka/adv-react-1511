import React, { Component } from 'react'
import AddPersonForm from '../people/add-person-form'
import { connect } from 'react-redux'
import { addPerson } from '../../ducks/people'

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Admin page</h1>
                <AddPersonForm onSubmit = {this.handleAddPerson} />
            </div>
        )
    }

    handleAddPerson = (person) => this.props.addPerson(person)
}

export default connect(null, { addPerson })(AdminPage)
