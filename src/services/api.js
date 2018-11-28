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

  lazyLoadingEvents = (limit, lastLoaded) =>
    this.fb
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(limit)
      .startAt(lastLoaded)
      .once('value')
      .then((res) => {
        const values = res.val()
        if (lastLoaded) {
          delete values[lastLoaded]
        }
        return values
      })

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
