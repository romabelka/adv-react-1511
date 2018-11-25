import firebase from 'firebase/app'
import 'firebase/auth'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  getEvents = async () => {
    let snapshot = await this.fb
      .database()
      .ref('events')
      .once('value')
    return snapshot.toJSON()
  }

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

let api = new ApiService()
window._fb_api = api

export default api
