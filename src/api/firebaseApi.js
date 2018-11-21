import firebase from "firebase/app";

export default {
  init: () =>
    new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => resolve(user));
    }),
  signIn: ({ email, password }) =>
    firebase.auth().signInWithEmailAndPassword(email, password),
  signUp: ({ email, password }) =>
    firebase.auth().createUserWithEmailAndPassword(email, password),
  signOut: () => firebase.auth().signOut()
};
