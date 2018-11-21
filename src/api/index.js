import firebase from 'firebase/app'


export const onChangedAuthState = (user) => firebase.auth().onAuthStateChanged(user);

export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)

export const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)