// import * as admin from 'firebase-admin'
// import {appName} from "../config";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// var data = require('../minoga-react-firebase-adminsdk-s0uob-20c31a9059.json');
// // import * as data from './minoga-react-firebase-adminsdk-s0uob-20c31a9059.json';
//
// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: `https://${appName}.firebaseio.com`,
// });
// const root = admin

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchAllEvents = () =>
    this.fb
      .database()
      .ref('events')
      .once('value')
      .then((res) => res.val())

  fetchLazyEvents = (id = '') =>
    this.fb
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(id)
      .once('value')
      .then((data) => data.val())

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  // fetchAllPersons = () =>
  //     root
  //         .auth()
  //         .listUsers()
  //         .then(function (userRecord) {
  //             console.log("Successfully fetched user data:", userRecord.toJSON());
  //         })
  //         .catch(function (error) {
  //             console.log("Error fetching user data:", error);
  //         });
}

export default new ApiService()
