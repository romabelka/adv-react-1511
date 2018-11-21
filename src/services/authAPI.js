import firebase from 'firebase/app'

const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)
const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)
const onAuthStateChanged = (cb) => firebase.auth().onAuthStateChanged(cb)

export const authAPI = {
    signIn,
    signUp,
    onAuthStateChanged
}

