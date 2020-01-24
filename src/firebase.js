import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

var firebaseConfig2 = {
  apiKey: 'AIzaSyDRsdvcOX-nqVYJ2LWR_eshrzsfmBUj2G0',
  authDomain: 'mykid-f0c9a.firebaseapp.com',
  databaseURL: 'https://mykid-f0c9a.firebaseio.com',
  projectId: 'mykid-f0c9a',
  storageBucket: 'mykid-f0c9a.appspot.com',
  messagingSenderId: '976411845065',
  appId: '1:976411845065:web:13190fdde51c6a258dc818',
  measurementId: 'G-CGSDH3NNN1'
};

// Initialize Firebase
const fireapp = firebase.initializeApp(firebaseConfig2);

fireapp.analytics();

export default fireapp;
