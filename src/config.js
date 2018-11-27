import firebase from 'firebase/app'

export const appName = 'course-react-advanced'

const firebaseConfig = {
  apiKey: 'AIzaSyCpt1zg3i1Ge4A5hwRFGf-LH2bL0Ktp2Ko',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '555325786267'
}

firebase.initializeApp(firebaseConfig)
