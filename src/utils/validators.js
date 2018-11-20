import emailValidator from "email-validator";

export const simpleFormValidator = ({ email, password }) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    else if (!emailValidator.validate(email)) errors.email = 'incorrect email'

    if (!password) errors.password = 'password is a required field'
    else if (password.length < 8) errors.password = 'password is too short'

    return errors
}