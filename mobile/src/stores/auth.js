import { observable, action, computed } from 'mobx'
import { validate } from 'email-validator'
import api from '../services/api'

export default class AuthStore {
    @observable email = ''
    @observable password = ''

    @observable loading = false
    @observable user = null
    @observable error = null

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password
    @action setError = error => this.error = error
    @action setLoading = loading => this.loading = loading
    @action setUser = user => this.user = user

    @action authorize = async (action) => {
        const { email, password } = this

        if(!this.isValidEmail) return
        if(!this.isValidPassword) return

        try{
            this.setLoading(true)

            const user = await api[action](email, password)

            this.setUser(user)

        } catch(err){
            this.setError(err.toString())      
        }
        this.setLoading(false)
    }

    @computed get isValidEmail() {
        return validate(this.email)
    }

    @computed get isValidPassword() {
        return this.password.length > 5
    }
}