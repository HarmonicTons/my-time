import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrewe9Lib7CQdbedKL4o8IUxXWNWsc60k",
  authDomain: "my-time-9da4e.firebaseapp.com",
  databaseURL: "https://my-time-9da4e.firebaseio.com",
  projectId: "my-time-9da4e",
  storageBucket: "my-time-9da4e.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export { firebase };
