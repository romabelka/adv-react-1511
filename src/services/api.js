import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchAllEvents = () => {
    return this.fb
      .database()
      .ref('events')
      .once('value')
      .then((res) => res.val())
  }

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  fetchChunk = (startIndex, stopIndex) => {
    return this.fb
      .database()
      .ref('events')
      .orderByKey()
      .startAt('' + startIndex)
      .limitToFirst(+stopIndex)
      .once('value')
      .then((res) => res.val())
  }
}

export default new ApiService()
