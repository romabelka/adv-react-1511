import firebase from 'firebase/app'

export const appName = 'adv-react-1511-course'

const firebaseConfig = {
  apiKey: 'AIzaSyCdPOGDajokvQNRtZmm_pIxG755tkAwsyQ',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: `${appName}`,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '142521956378'
}

firebase.initializeApp(firebaseConfig)
