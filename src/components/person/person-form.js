import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from "../common/error-field"

class PersonForm extends Component {
    static propTypes = {

    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                <h3>New person</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        First Name:
                        <Field name='firstName' component={ErrorField} />
                    </div>
                    <div>
                        Last Name:
                        <Field name='lastName' component={ErrorField} />
                    </div>
                    <div>
                        Email:
                        <Field name='email' component={ErrorField} />
                    </div>
                    <button>Add</button>
                </form>
            </div>
        )
    }

    handleSubmit = ({firstName, lastName, email }) => this.props.newPerson(firstName, lastName, email)
    
}

const validate = ({ firstName, lastName, email}) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  else if (!emailValidator.validate(email)) errors.email = 'incorrect email'

  if (!firstName) errors.firstName = 'First name is a required field'
  
  if (!lastName) errors.lastName = 'Last name is a required field'
  
  return errors
}


export default reduxForm({
    form: 'newPerson',
    validate
})(PersonForm)