import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form';
import { simpleFormValidator } from '../../utils/validators'
import ErrorField from '../common/error-field'

class AddAccountForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }
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