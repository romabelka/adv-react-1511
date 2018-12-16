import { observable, action } from 'mobx'
import { OrderedMap } from 'immutable'
import api from '../services/api'


export default class EventsStore {
  @observable eventsList = []
  @observable loading = false

  @action loadEventsList() {
    this.loading = true;
    api.fetchAllEvents().then(this.loadEventsSuccess)
  }
  @action.bound
  loadEventsSuccess(data) {
    this.eventsList = data
    this.loading = false
  }
}