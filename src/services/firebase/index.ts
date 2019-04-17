import * as firebase from "firebase";
import "firebase/firestore";
import * as firebaseConfig from "../../configuration/firebase-conf.json";

firebase.initializeApp(firebaseConfig);

export default firebase;
