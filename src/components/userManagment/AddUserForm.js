import React, { Component, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import emailValidator from "email-validator";
import ErrorField from "../common/error-field";

class AddUserForm extends Component {
  static propTypes = {};
  render() {
    const { handleSubmit, submitting, pristine, reset } = this.props;
    return (
      <Fragment>
        <h3>Add user</h3>
        <form onSubmit={handleSubmit}>
          <Field name="username" label="UserName:" component={ErrorField} />
          <Field name="email" label="Email:" component={ErrorField} />
          <Field
            name="password"
            label="Password:"
            component={ErrorField}
            type="password"
          />
          <button type="submit" disabled={submitting}>
            Add user
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </form>
      </Fragment>
    );
  }
}

const validate = ({ username, email, password }) => {
  const errors = {};

  if (!username) errors.email = "username is a required field";
  else if (username.length < 3 || username.length > 32)
    errors.username = "incorrect username";

  if (!email) errors.email = "email is a required field";
  else if (!emailValidator.validate(email)) errors.email = "incorrect email";

  if (!password) errors.password = "password is a required field";
  else if (password.length < 8) errors.password = "password is too short";

  return errors;
};

export default reduxForm({
  form: "addUser",
  validate
})(AddUserForm);
