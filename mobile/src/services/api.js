import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
    fb = firebase

    signIn = (email, password) =>
        this.fb.auth().signInWithEmailAndPassword(email, password)

    fetchAllByEntityName = ref =>
        this.fb
            .database()
            .ref(ref)
            .once('value')
            .then((res) => res.val())

    fetchAllEvents = () => this.fetchAllByEntityName('events')


    fetchAllPeople = () => this.fetchAllByEntityName('people')

    onAuthStateChanged = callback =>
        this.fb
            .auth()
            .onAuthStateChanged(callback)
}

export default new ApiService()
