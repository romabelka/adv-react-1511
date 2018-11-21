import firebase from 'firebase/app'

export const singIn = ( email, password ) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

export const singUp = ( email, password ) => 
  firebase.auth().createUserWithEmailAndPassword(email, password)

export const init = func =>
  firebase.auth().onAuthStateChanged(func)  
