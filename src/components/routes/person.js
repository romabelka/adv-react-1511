import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import PersonForm from '../person/person-form'
import {newPerson} from '../../ducks/person'


class PersonPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Person Page</h1>
                <Route path='/person/person' render = {() => <PersonForm onSubmit = {this.handleNewPerson}/>} />
                <p></p>
            </div>
        )
    }   
    handleNewPerson = person => this.props.newPerson(person)
}

export default connect(null, { newPerson})(PersonPage)