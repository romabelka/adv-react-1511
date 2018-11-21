import fb from "firebase/app";

 const signIn = (email, password) => fb.auth().signInWithEmailAndPassword(email, password)

 const signUp = (email, password) =>  fb.auth().createUserWithEmailAndPassword(email, password)

 export default { signIn, signUp };