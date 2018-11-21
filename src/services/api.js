import firebase from 'firebase/app'

export const auth = {
    init: (cb) => firebase.auth().onAuthStateChanged(cb),
    signIn: (email, password) => firebase.auth().signInWithEmailAndPassword(email, password),
    signUp: (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)
}