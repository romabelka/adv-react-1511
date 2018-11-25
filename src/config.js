import firebase from 'firebase/app'

export const appName = 'advreact-15-11-m-buglov'

const firebaseConfig = {
  apiKey: 'AIzaSyDCJOim2E9J1t9OQh254jQGcUEnQG3mJMs',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '684006327860'
}

firebase.initializeApp(firebaseConfig)
