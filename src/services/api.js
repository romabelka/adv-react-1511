import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchEventsCount = () =>
    this.fb
      .database()
      .ref('eventsCount')
      .once('value')
      .then((res) => res.val())

  fetchEvents = (lastLoadedId = '', limit = 10) => {
    return this.fb
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(limit)
      .startAt(lastLoadedId)
      .once('value')
      .then((res) => res.val())
  }

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
