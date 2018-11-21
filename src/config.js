import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'advreact-15-11-744b8'

const firebaseConfig = {
    apiKey: 'AIzaSyDkVv5Vr_rG46eNKpzsajyTGt8J3JxfaOo',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: '819482876663'
}

firebase.initializeApp(firebaseConfig)