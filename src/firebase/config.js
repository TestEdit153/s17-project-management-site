import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCPj0T7xNbYfPj65Sy9vWWuwqjHTR7pF8A",
    authDomain: "dojosite-e4abe.firebaseapp.com",
    projectId: "dojosite-e4abe",
    storageBucket: "dojosite-e4abe.appspot.com",
    messagingSenderId: "223331045918",
    appId: "1:223331045918:web:631789e4c7742733d0940f"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init-services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// init FIrestore TImestamp
const timestamp = firebase.firestore.Timestamp

export {projectAuth, projectFirestore, projectStorage, timestamp}

