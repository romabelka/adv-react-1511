import { observable, action } from 'mobx'
import { OrderedMap } from 'immutable'
import api from '../services/api'


export default class PeopleStore {
  @observable peopleList = []
  @observable loading = false

  @action loadPeopleList() {
    this.loading = true;
    api.loadAllPeople().then(this.loadPeopleListSuccess)
  }
  @action.bound
  loadPeopleListSuccess(data) {
    this.peopleList = new OrderedMap(data).valueSeq().toArray()
    this.loading = false
  }
}