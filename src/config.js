import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'advreact-15-11'

const firebaseConfig = {
  apiKey: 'AIzaSyCagGg_3tIdTjzSkdMChi1rfZ4F5qTKPMw',
  authDomain: 'advanced-react-app.firebaseapp.com',
  databaseURL: 'https://advanced-react-app.firebaseio.com',
  projectId: 'advanced-react-app',
  storageBucket: 'advanced-react-app.appspot.com',
  messagingSenderId: '93649441415'
}

firebase.initializeApp(firebaseConfig)
