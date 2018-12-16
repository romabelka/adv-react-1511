import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'advreact-15-11-2f625'

const firebaseConfig = {
  apiKey: 'AIzaSyCtfxxmM6UdYLUJXZ41V_6XgBcbtb56-Xk',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '934133221712'
}

firebase.initializeApp(firebaseConfig)
