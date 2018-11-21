import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {reset} from 'redux-form'

import AddPerson from '../form/add-person'
import {addPerson} from '../../ducks/people'

class People extends Component {
    static propTypes = {

    }

    render() {
        const isPeopleExist = this.props.people.size > 0;
        const [...list] = this.props.people.values();

        return (
            <div>
                <h1>People</h1>
                {isPeopleExist  && (
                    <ul>
                        { list.map(person => (<li key={person.email}>{person.fname} {person.lname}</li>)) }
                    </ul>
                )}
                <Route path='/people' render = {() => <AddPerson onSubmit = {this.handleAddPerson}/>} />
            </div>
        )
    }

    handleAddPerson = ({ email, fname, lname }) => {
        this.props.addPerson(email, fname, lname)
        this.props.reset('addPersons')
    }
}

export default connect(state => ({
    people: state.people,
}), { addPerson, reset })(People)