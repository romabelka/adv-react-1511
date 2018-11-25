import firebase from 'firebase/app'

export const appName = 'adv-react-1511-9ffb7'

const firebaseConfig = {
  apiKey: 'AIzaSyDilbRVptjVWHfFWer3QzfdlvZJhWRFhCM',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '869317625910'
}

firebase.initializeApp(firebaseConfig)
