import {observable, action, computed, flow, configure} from 'mobx'
import api from './../services/api'

export default class PeopleStore {
    @observable persons = []

    fetchAllPeople = flow(function* () { // <- note the star, this a generator function!
        console.log('************')
        try {
            const people = yield api.fetchAllEvents() // yield instead of await
            console.log('+++', people);
            const filteredProjects = people.map((person, id) => ({id, ...person}))
            // the asynchronous blocks will automatically be wrapped in actions and can modify state
            this.people = filteredProjects
        } catch (error) {
        }
    })

}