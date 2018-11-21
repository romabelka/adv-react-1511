import React from 'react'
import {reduxForm, reset, Field} from 'redux-form'
import ErrorField from '../common/error-field'
import emailValidator from 'email-validator'

const PeopleForm = ({ handleSubmit,submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field name='email' component={ErrorField} label='Email: ' placeholder='Email' />
    <Field name='firstName' component={ErrorField} label='First name: ' placeholder='First name' />
    <Field name='lastName' component={ErrorField} label='Last name: ' placeholder='Last name' />
    <button disabled={submitting}>
      Submit
    </button>

  </form>
)
const validate = values => {
  const errors = {}

  if(!values.email) errors.email = 'Required'
  else if (!emailValidator.validate(values.email)) errors.email = 'Invalid email address'

  if(!values.firstName) errors.firstName = 'Required'
  else if (values.firstName.length < 4) errors.firstName = 'min 4'

  if(!values.lastName) errors.lastName = 'Required'
  else if (values.lastName.length < 4) errors.lastName = 'min 4'
  return errors
}
const afterSubmit = (result, dispatch) =>
  dispatch(reset('people'));

export default reduxForm({
  form: 'people',
  validate,
  onSubmitSuccess: afterSubmit,
})(PeopleForm)
