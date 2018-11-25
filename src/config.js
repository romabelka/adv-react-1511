import firebase from 'firebase/app'

export const appName = 'advreact-15-11'

const firebaseConfig = {
  apiKey: 'AIzaSyBQIpfsobo06Iow7UN3xjf6t3GJLSd56gY',
  authDomain: 'api-project-1063807834150.firebaseapp.com',
  databaseURL: 'https://api-project-1063807834150.firebaseio.com',
  projectId: 'api-project-1063807834150',
  storageBucket: 'api-project-1063807834150.appspot.com',
  messagingSenderId: '1063807834150'
}

firebase.initializeApp(firebaseConfig)
