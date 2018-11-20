import React, { Component } from "react";
import { connect } from "react-redux";
import AddPersonForm from "../people/add-person-form";
import { addPerson } from "../../ducks/people";

class PeoplePage extends Component {
  static propTypes = {};

  handleSubmit = user => this.props.addPerson(user);

  render() {
    return (
      <div>
        <h1>People Page</h1>
        <AddPersonForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { addPerson }
)(PeoplePage);
