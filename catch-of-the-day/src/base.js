import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAJfc-cOKG-Q_rxy_LO7nRFV95vuxhxtLM",
    authDomain: "catch-of-the-day-monster-cat.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-monster-cat.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;
