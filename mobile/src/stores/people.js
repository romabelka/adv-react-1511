import firebase from 'firebase/app'
import {observable, action } from 'mobx'

export default class PeopleStore{
  @observable loading = false
  @observable people = null

  @action loadPeople = () => {
    this.loading = true
    firebase.database().ref('people')
      .once('value',
        action(snapshot => {
         data = snapshot.val()
         Object.entries(data).forEach(([id,person]) => person.id = id)
         this.people = data
         this.loading = false
        })
      )
  }

}