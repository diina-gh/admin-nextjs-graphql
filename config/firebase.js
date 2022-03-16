import firebase from 'firebase/app';
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyDzcC7qTnhj67078XJcjHR_2c06mDJOODY",
    authDomain: "trade-d57de.firebaseapp.com",
    projectId: "trade-d57de",
    storageBucket: "trade-d57de.appspot.com",
    messagingSenderId: "877286900373",
    appId: "1:877286900373:web:3030d87a563e129638119c"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;