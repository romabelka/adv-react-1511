import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  loadEvents = () => {
    return this.fb
      .database()
      .ref('/events')
      .once('value')
      .then((snapshot) => snapshot.val())
      .then((byId) => Object.keys(byId).map((id) => byId[id]))
  }

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
