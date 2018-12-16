import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'minoga-react'

const firebaseConfig = {
    apiKey: 'AIzaSyADIdr7vrY9qbbdXT2Gl02D0KDo95VtuZ0',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: '794785817973'
}

firebase.initializeApp(firebaseConfig)