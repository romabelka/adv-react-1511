import firebase from 'firebase/app'

export const appName = 'advreact-15-11'

const firebaseConfig = {
  apiKey: 'AIzaSyDWW03UZbUlsONRLXicKn0GEVz49sQF9kU',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '509870743520'
}

firebase.initializeApp(firebaseConfig)
