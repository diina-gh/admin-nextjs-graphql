import firebase from 'firebase/app';
import 'firebase/storage'

const config = {
    apiKey: "example_apikey",
    authDomain: "example_domain",
    projectId: "example_pid",
    storageBucket: "example_sb",
    messagingSenderId: "example_msi",
    appId: "example_appId"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;
