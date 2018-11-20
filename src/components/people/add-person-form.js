import React, {Component} from 'react'
import {reset, reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

class AddPersonForm extends Component {
    render() {
        const {handleSubmit} = this.props
        return (
            <div>
                <h3>Add person</h3>
                <form onSubmit={handleSubmit}>
                    <Field name='email' label='Email:' component={ErrorField}/>
                    <Field name='firstName' label='First name:' component={ErrorField}/>
                    <Field name='lastName' label='Last name:' component={ErrorField}/>
                    <button>Add</button>
                </form>
            </div>
        )
    }
}

const validate = ({ email, firstName, lastName }) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    else if (!emailValidator.validate(email)) errors.email = 'incorrect email'

    if (!firstName) errors.firstName = 'First name is a required field'
    if (!lastName) errors.lastName = 'Last name is a required field'

    return errors
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('addPerson'))

export default reduxForm({
    form: 'addPerson',
    onSubmitSuccess: afterSubmit,
    validate
})(AddPersonForm)

