import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

class AddUserForm extends Component {

  submitMyForm = (data) => {
    const { reset, handleSubmit, valid } = this.props;
    handleSubmit(data)
    valid && reset()
  }

    render() {
        return (
            <div>
                <form onSubmit={this.submitMyForm}>
                    <Field name='firstName' label = 'First name:' component={ErrorField} />
                    <Field name='lastName' label = 'Last name:' component={ErrorField} />
                    <Field name='email' label = 'Email:' component={ErrorField} />
                    <button >Add</button>
                </form>
            </div>
        )
    }
}

const validate = ({ firstName, lastName, email }) => {
  const errors = {}
  if (!firstName) errors.firstName = 'first name is a required field'
  else if (firstName.length < 3) errors.firstName = 'first name is too short'

  if (!lastName) errors.lastName = 'last name is a required field'
  else if (lastName.length < 3) errors.lastName = 'last name is too short'

  if (!email) errors.email = 'email is a required field'
  else if (!emailValidator.validate(email)) errors.email = 'incorrect email'

  return errors
}

export default reduxForm({
    form: 'addUser',
    validate
})(AddUserForm)