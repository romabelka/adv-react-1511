import firebase from "firebase/app";

const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export default { signIn, signUp };
