import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchEvents = (length = 10, from = null) => {
    if (from) {
      return this.fb
        .database()
        .ref('events')
        .orderByKey()
        .startAt(from)
        .limitToFirst(length)
        .once('value')
        .then((res) => res.val())
    } else {
      return this.fb
        .database()
        .ref('events')
        .orderByKey()
        .limitToFirst(length)
        .once('value')
        .then((res) => res.val())
    }
  }

  fetchAllEvents = () =>
    this.fb
      .database()
      .ref('events')
      .orderByKey()
      .once('value')
      .then((res) => res.val())

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

let fb = new ApiService()
window.__fb = fb

export default fb
