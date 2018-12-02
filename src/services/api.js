import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

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

  fetchAllPeople = () =>
    this.fb
      .database()
      .ref('people')
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

  addPerson = (person) =>
    this.fb
      .database()
      .ref('people')
      .push(person)
      .then((data) => data.key)

  addPersonToEvent = (eventId, peopleIds) =>
    this.fb
      .database()
      .ref(`events/${eventId}/peopleIds`)
      .set(peopleIds)
      .then((data) => data)

  deletePerson = (personId) =>
    this.fb
      .database()
      .ref(`people/${personId}`)
      .remove()
      .then((data) => data)

  deleteEvent = (eventId) =>
    this.fb
      .database()
      .ref(`events/${eventId}`)
      .remove()
      .then((data) => data)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
