import { observable, action, computed } from 'mobx'
import { validate } from 'email-validator'

export default class AuthStore {
    @observable email = ''
    @observable password = ''

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password

    @computed get isValidEmail() {
        return validate(this.email)
    }
}