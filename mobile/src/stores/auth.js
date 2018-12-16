import { observable, action, computed } from 'mobx'
import { validate } from 'email-validator'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export default class AuthStore {
    @observable email = ''
    @observable password = ''
    @observable user = null

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password
    @action signIn = () => this.user = firebase.auth().signInWithEmailAndPassword(this.email, this.password)
     

    @computed get isValidEmail() {
        return validate(this.email)
    }
}