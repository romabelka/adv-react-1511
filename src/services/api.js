import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

window['fb'] = firebase

class ApiService {
  fb = firebase
  eventsCollection = this.fb.database().ref('events')

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchAllEvents = () =>
    this.eventsCollection.once('value').then((res) => res.val())

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  fetchEventsBatch = (startKAt = '', limit = 10) =>
    this.eventsCollection
      .orderByKey()
      .startAt(startKAt)
      .limitToFirst(limit)
      .once('value')
      .then((value) => value.val())
}

export default new ApiService()
