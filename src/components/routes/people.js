import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {addPerson} from '../../ducks/people'
import AddPersonForm from '../people/add-person-form'

class PersonPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Add new person</h2>

                <Route path='/people' render = {() => <AddPersonForm onSubmit={this.handlePerson}/>} />

            </div>
        )
    }

    handlePerson = ({ firstName, lastName, email }) => this.props.addPerson(firstName, lastName, email)
}

export default connect(null, { addPerson })(PersonPage)
