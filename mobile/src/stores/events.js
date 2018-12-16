import firebase from 'firebase/app'
import {observable, action } from 'mobx'

export default class EventsStore{
  @observable loading = false
  @observable events = null

  @action loadEvents = () => {
    this.loading = true
    firebase.database().ref('events')
      .once('value',
        action(snapshot => {
         data = snapshot.val()
         Object.entries(data).forEach(([id,event]) => event.id = id)
         this.events = data
         this.loading = false
        })
      )
  }

}