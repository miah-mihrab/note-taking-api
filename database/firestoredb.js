var admin = require("firebase-admin");
var firebase = require('firebase')
var serviceAccount = require("./note-taking-api-firebase-adminsdk-q9vcd-85f75451ed.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://note-taking-api.firebaseio.com"
});
var firebaseConfig = {
    apiKey: "AIzaSyDpSV4oRRW3BL4qbgb02b3PSchLpIUfxgg",
    authDomain: "note-taking-api.firebaseapp.com",
    databaseURL: "https://note-taking-api.firebaseio.com",
    projectId: "note-taking-api",
    storageBucket: "note-taking-api.appspot.com",
    messagingSenderId: "710287804464",
    appId: "1:710287804464:web:341703b329f4937cb0c5f5",
    measurementId: "G-S8PRRC29HG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);