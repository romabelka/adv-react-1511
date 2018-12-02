import firebase from 'firebase/app'

export const appName = 'adv-react-1511-course'

const firebaseConfig = {
  apiKey: 'AIzaSyCdPOGDajokvQNRtZmm_pIxG755tkAwsyQ',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '142521956378'
}

/**
 *
 <script src="https://www.gstatic.com/firebasejs/5.6.0/firebase.js"></script>
 <script>
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCdPOGDajokvQNRtZmm_pIxG755tkAwsyQ",
    authDomain: "adv-react-1511-course.firebaseapp.com",
    databaseURL: "https://adv-react-1511-course.firebaseio.com",
    projectId: "adv-react-1511-course",
    storageBucket: "adv-react-1511-course.appspot.com",
    messagingSenderId: "142521956378"
  };
 firebase.initializeApp(config);
 </script>
 */

firebase.initializeApp(firebaseConfig)
