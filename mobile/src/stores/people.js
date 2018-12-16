import { observable, action, computed } from 'mobx'
import { validate } from 'email-validator'
import api from '../services/api'

export default class PeopleStore {
    @observable loading = false
    @observable people = {}
    @observable error = null
    @observable loaded = false

    @action setLoading = loading => this.loading = loading
    @action setLoaded = loaded => this.loaded = loaded
    @action setPeople = people => this.people = people
    @action setError = error => this.error = error

    @action selectPeopleAsArray = () => Object.entries(this.people).map(([ id, person ]) => ({ id, ...person }))

    @action getPeople = async () => {

        try{
            this.setLoading(true)

            const people = await api.loadAllPeople()

            this.setPeople(people)
            this.setLoaded(true)

        } catch(err){
            console.log('err', err)
            this.setError(err.toString())      
        }
        this.setLoading(false)
    }
}