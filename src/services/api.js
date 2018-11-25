import firebase from 'firebase/app'
import 'firebase/auth'
import { GET_CONFERENCES_SUCCESS } from '../ducks/conferences'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)
  get = () =>
    firebase
      .database()
      .ref('/events')
      .on('value', function(data) {
        return window.store.dispatch({
          type: GET_CONFERENCES_SUCCESS,
          payload: { data: data.val() }
        })
      })

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
