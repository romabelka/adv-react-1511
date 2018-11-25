import firebase from 'firebase/app'
import 'firebase/auth'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  getEvents = async () => {
    const eventsRef = firebase.database().ref('/events')
    try {
      const data = await eventsRef.once('value')
      return data.val()
    } catch (err) {
      return err
    }
  }
}

export default new ApiService()
