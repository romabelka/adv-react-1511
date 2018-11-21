import React, { Component } from 'react'
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

                <AddPersonForm onSubmit={this.handlePerson}/>

            </div>
        )
    }

    handlePerson = (user) => this.props.addPerson(user)
}

export default connect(null, { addPerson })(PersonPage)
