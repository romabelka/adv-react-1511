import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

window.__fb = firebase

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchAllEvents = () =>
    this.fb
      .database()
      .ref('events')
      .once('value')
      .then((res) => res.val())

  fetchLazyEvents = (id = '') =>
    this.fb
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(id)
      .once('value')
      .then((data) => data.val())

  savePerson = (user) => {
    return this.fb
      .database()
      .ref(`/users/${user.id}`)
      .set(user)
  }

  fetchAllPersons = () =>
    this.fb
      .database()
      .ref('users')
      .once('value')
      .then((res) => res.val())

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
