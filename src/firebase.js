import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyB-eNlH6e959UXs2a-I0wkHAMnf-0t4Ryg",
  authDomain: "filelists-57511.firebaseapp.com",
  databaseURL: "https://filelists-57511.firebaseio.com",
  projectId: "filelists-57511",
  storageBucket: "filelists-57511.appspot.com",
  messagingSenderId: "100672959363"
});

export { firebaseConfig as firebase };
