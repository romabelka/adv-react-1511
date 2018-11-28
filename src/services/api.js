import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchCount = () =>
    this.fb
      .database()
      .ref('events')
      .once('value')
      .then((res) => res.numChildren())

  fetchEvents = (id = '') =>
    this.fb
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(id)
      .once('value')
      .then((res) => res.val())

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
