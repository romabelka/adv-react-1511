import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AddPeopleForm from '../people/add-form';
import { addPeople } from '../../ducks/people';

class AuthPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <h1>Add People</h1>
        <Route
          path="/people/add"
          render={() => <AddPeopleForm onSubmit={this.handleAddPeople} />}
        />
      </div>
    );
  }

  handleAddPeople = ({ email, firstName, lastName }) => {
    this.props.addPeople(email, firstName, lastName);
  }
}

export default connect(
  null,
  { addPeople },
)(AuthPage);
