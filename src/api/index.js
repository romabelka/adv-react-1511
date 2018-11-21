import firebase from 'firebase/app'

export const onAuthStateChanged = (callback) => {
  return firebase.auth().onAuthStateChanged(user => {
    if(user){
      callback(user)
    }
  })
}

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const createUserWithEmailAndPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}