import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'advreact-15-11-9682b'

const firebaseConfig = {
    apiKey: 'AIzaSyDrsgJ6qZSzopwlT5T8O7tiPBnELIkaZ3Y',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: '1090869982660'
}

firebase.initializeApp(firebaseConfig)