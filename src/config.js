import firebase from 'firebase/app';
import 'firebase/auth';

export const appName = 'fidelman-advreact-15-11';

const firebaseConfig = {
  apiKey: 'AIzaSyBHo3KAqhZkZcr0gAjJkAdjXCAnca_4f0M',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: '',
  messagingSenderId: '578523122882',
};

firebase.initializeApp(firebaseConfig);
