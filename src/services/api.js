import firebase from 'firebase/app'
import 'firebase/auth'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchEvents = () =>
    this.fb
      .database()
      .ref('/events')
      .once('value')
      .then((snap) => snap.val())

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
