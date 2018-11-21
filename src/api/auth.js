import firebase from 'firebase/app'

export const signIn= (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
export const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);