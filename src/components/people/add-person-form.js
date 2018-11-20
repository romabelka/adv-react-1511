import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import ErrorField from "../common/error-field";
import emailValidator from "email-validator";

class AddPersonForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h3>Add Person</h3>
        <form onSubmit={handleSubmit}>
          <Field name="email" label="Email:" component={ErrorField} />
          <Field
            name="firstName"
            label="firstName:"
            component={ErrorField}
            type="text"
          />
          <Field
            name="lastName"
            label="lastName:"
            component={ErrorField}
            type="text"
          />
          <button>Add</button>
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
  form: "addPerson",
  validate
})(AddPersonForm);
