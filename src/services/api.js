import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  addPersonFb = (person) =>
    this.fb
      .database()
      .ref('people')
      .push(person)

  fetchAllPersonFb = () =>
    this.fb
      .database()
      .ref('people')
      .once('value')
      .then((res) => res.val())

  addPersonToEventsFb = (path, peopleIds) =>
    this.fb
      .database()
      .ref(path)
      .set(peopleIds)

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

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
