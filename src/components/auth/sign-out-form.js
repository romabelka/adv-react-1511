import React, { Component } from "react";

class SignOutForm extends Component {
  static propTypes = {};

  render() {
    const { onSubmit } = this.props;
    return (
      <div>
        <button onClick={onSubmit}>SignOut</button>
      </div>
    );
  }
}

export default SignOutForm;
