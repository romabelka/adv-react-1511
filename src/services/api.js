import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  delete = (path) => {
    return this.fb
      .database()
      .ref(path.join('/'))
      .remove()
  }

  addPerson = (id, person) =>
    this.fb
      .database()
      .ref('people/' + id)
      .set(person)

  addPersonToEvent = (personId, eventId) =>
    this.fb
      .database()
      .ref(`events/${eventId}/peopleIds/${personId}`)
      .set(personId)

  fetchAll = (refName) =>
    this.fb
      .database()
      .ref(refName)
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
