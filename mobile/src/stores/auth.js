import {observable, action, computed} from 'mobx'
import {validate} from 'email-validator'
import BasicStore from './basic-store'
import api from '../services/api'

class AuthStore extends BasicStore {
    constructor(...args) {
        super(...args)

        api.onAuthStateChanged(this.setUser)
    }


    @observable email = ''
    @observable password = ''
    @observable user = null
    @computed get isValidEmail() {
        return validate(this.email)
    }

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password
    @action setUser = user => this.user = user

    signIn = () => {
        api.signIn(this.email, this.password)
            .then(action(user => {
                this.user = user
                console.log('---', 123, user)
            }))
    }


}

export default AuthStore