import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import { simpleFormValidator } from '../../utils/validators'
import ErrorField from '../common/error-field'

class SignUpForm extends Component {
    static propTypes = {

    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <Field name='email' label = 'Email:' component={ErrorField} />
                    <Field name='password' label = 'Password:' component={ErrorField} type='password'/>
                    <button >Sign Up</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'auth',
    validate: simpleFormValidator
})(SignUpForm)