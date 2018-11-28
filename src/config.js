import firebase from 'firebase/app'

export const appName = 'adv-react-a7336'

const firebaseConfig = {
  apiKey: 'AIzaSyCdjjLsE-1rYsTIRLNi0N6D7lXbZGCipYc',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '668686566721'
}

firebase.initializeApp(firebaseConfig)
