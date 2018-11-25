import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  loadEvents = () =>
    new Promise((resolve) => {
      this.fb
        .database()
        .ref('events')
        .once('value')
        .then((snapshot) => resolve(snapshot.val()))
    })
}

export default new ApiService()
