import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  eventsCollection = firebase.database().ref('events')

  setEventsListener = (resolve, reject) => {}

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  getEvents = (callback) => {}
}

window.fb = firebase

export default new ApiService()
