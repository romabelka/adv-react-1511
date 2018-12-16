import { observable, action, computed } from 'mobx'
import { validate } from 'email-validator'
import api from '../services/api'

export default class EventStore {
    @observable loading = false
    @observable events = {}
    @observable error = null
    @observable loaded = false

    @action setLoading = loading => this.loading = loading
    @action setLoaded = loaded => this.loaded = loaded
    @action setEvents = events => this.events = events
    @action setError = error => this.error = error

    @action selectEventsAsArray = () => Object.entries(this.events).map(([ id, event ]) => ({ id, ...event }))

    @action getEvents = async () => {

        try{
            this.setLoading(true)

            const events = await api.fetchAllEvents()

            this.setEvents(events)
            this.setLoaded(true)

        } catch(err){
            this.setError(err.toString())      
        }
        this.setLoading(false)
    }
}