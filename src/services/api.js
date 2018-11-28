import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchAllEvents = (firstLoadingLimit) => {
    let i = 1
    return this.fb
      .database()
      .ref('events')
      .once('value')
      .orderByKey()
      .limitToFirst(firstLoadingLimit)
      .then((res) => res.val())
  }

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  fetchChunk = (startIndex, stopIndex) => {
    let i = 1
    this.fb
      .database()
      .ref('events')
      .startAt(startIndex)
      .endAt(stopIndex)
      .once('child_added')
      .then((snap) => {
        var person = snap.val()
        console.log(person)
        console.log(snap.key)
      })
  }
}

export default new ApiService()
