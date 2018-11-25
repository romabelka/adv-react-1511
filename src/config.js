import firebase from 'firebase/app'
import 'firebase/database'
// import 'firebase/auth'

export const appName = 'advreact-15-11-roman-kh'

const firebaseConfig = {
  apiKey: 'AIzaSyCErJrRWQod8iAwjbbch_KUBkUFpIzd1aE',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '664871109470'
}

firebase.initializeApp(firebaseConfig)
