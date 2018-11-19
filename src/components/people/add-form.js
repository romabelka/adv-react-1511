import React, { Component } from 'react'
import {reduxForm, Field, reset} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

const FORM_NAME = 'add-people';

const onSubmitSuccess = (_unknown, dispatch) => {
    dispatch(reset(FORM_NAME))
};

class AddForm extends Component {
    render() {
        return (
            <div>
                <h3>Add People</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <Field name='email' label = 'Email:' component={ErrorField} />
                    <Field name='firstName' label = 'First Name:' component={ErrorField} />
                    <Field name='lastName' label = 'Last Name:' component={ErrorField} />
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

    if (!firstName) errors.firstName = 'firstName is a required field'
    if (!lastName) errors.lastName = 'lastName is a required field'

    return errors
}

export default reduxForm({
    form: FORM_NAME,
    validate,
    onSubmitSuccess,
})(AddForm)