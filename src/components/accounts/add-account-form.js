import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { simpleFormValidator } from '../../utils/validators'
import ErrorField from '../common/error-field'

class AddAccountForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Field name='email' component={ErrorField} label="Email" type="email" />
                <Field name="password" component={ErrorField} label="Password" type="password" />
                <button>Add</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'add-account',
    validate: simpleFormValidator,
})(AddAccountForm);