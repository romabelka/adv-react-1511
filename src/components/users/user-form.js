import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField from "../common/error-field";
import emailValidator from "email-validator";


class UserForm extends Component {
    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                <h3>Add new user</h3>
                <form onSubmit={handleSubmit}>
                    <Field name={'firstName'} label={'First name'} component={ErrorField} />
                    <Field name={'lastName'} label={'Last name'} component={ErrorField} />
                    <Field name={'email'} label={'Email'} component={ErrorField} />
                    <button>Create user</button>
                </form>
            </div>
        );
    }
}

const validate = ({firstName, lastName, email}) => {
    const errors = {
        firstName: null,
        email: null
    };
    if (!firstName) {
        errors.firstName = 'Please enter first name it is required field'
    }
    if (!email) {
        errors.email = 'Please enter email it is required field'
    } else if (!emailValidator.validate(email)) {
        errors.email = 'Incorrect email'
    }
    return errors;
}

export default reduxForm({
    form: 'user',
    validate
})(UserForm);
