import React from 'react'

import {reduxForm, Field} from 'redux-form'

const AddPersonForm = ({ handleSubmit }) => (
    <div>
        <h3>Add person form</h3>
        <form onSubmit={handleSubmit}>
            <div>
                Email:
                <Field name='email' component='input' />
            </div>
            <div>
                First Name:
                <Field name='fname' component='input' />
            </div>
            <div>
                Last Name:
                <Field name='lname' component='input' />
            </div>
            <button>Add person</button>
        </form>
    </div>
);
export default reduxForm({
    form: 'addPersons'
})(AddPersonForm)