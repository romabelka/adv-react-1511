import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

class AddUserForm extends Component {
    static propTypes = {

    }    

    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                <h3>Add User</h3>
                <form onSubmit={handleSubmit}>
                    <Field name='email' label = 'Email:' placeholder='1@example.com' component={ErrorField} />
                    <Field name='firstname' label = 'First Name:' placeholder='George' component={ErrorField} />
                    <Field name='lastname' label = 'Last Name:' placeholder='Black' component={ErrorField} />
                    <button >Add User</button>
                </form>
            </div>
        )
    }
}

const validate = ({ email, firstname, lastname }) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    else if (!emailValidator.validate(email)) errors.email = 'incorrect email'

    if (!firstname) errors.firstname = 'firstname is a required field'
    if (!lastname) errors.lastname = 'lastname is a required field'

    return errors
}

export default reduxForm({
    form: 'addUser',
    validate
})(AddUserForm)