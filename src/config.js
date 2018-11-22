import firebase from "firebase/app";
import "firebase/auth";

export const appName = "advreact-15-11-f9228";

const firebaseConfig = {
  apiKey: "AIzaSyAH4ocC3DvHHjqNn2ek8Grcg86cYPcDDmw",
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: `${appName}`,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: "743519450180"
};

firebase.initializeApp(firebaseConfig);
