import firebase from 'firebase/app'
import {SIGN_IN_SUCCESS} from "../ducks/auth";

export const api = {
    onAuthStateChanged: () => firebase.auth().onAuthStateChanged,
    signIn: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    signUp: (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}
