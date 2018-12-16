import { observable, action, computed } from 'mobx'
import api from '../services/api'
import { validate } from 'email-validator'

export default class AuthStore {
    @observable email = ''
    @observable password = ''
    @observable loading = false
    @observable isSuccess = false

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password

    @action signIn = (email, password) => {
        this.loading = true;
        api.signIn(email, password).then(this.signInSuccess, this.signInError)
    }

    @action.bound
    signInSuccess() {
        this.loading = false
        this.isSuccess = true
    }

    @action.bound
    signInError() {
      this.loading = false
      this.isSuccess = false
    }

    @computed get isValidEmail() {
        return validate(this.email)
    }
}