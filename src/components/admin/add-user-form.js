import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import emailValidator from "email-validator";
import ErrorField from "../common/error-field";

class AddUserForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h3>Add user</h3>
        <form onSubmit={handleSubmit}>
          <Field name="email" label="Email:" component={ErrorField} />
          <Field name="firstName" label="First name:" component={ErrorField} />
          <Field name="lastName" label="Last name:" component={ErrorField} />
          <button>Add user</button>
        </form>
      </div>
    );
  }
}

const validate = ({ email, firstName, lastName }) => {
  const errors = {};

  if (!email) errors.email = "email is a required field";
  else if (!emailValidator.validate(email)) errors.email = "incorrect email";

  if (!firstName) errors.firstName = "firstName is a required field";
  if (!lastName) errors.lastName = "lastName is a required field";
  return errors;
};

export default reduxForm({
  form: "addUser",
  validate
})(AddUserForm);
