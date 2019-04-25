import firebase from "../firebase";

export interface IFireStoreOccurence {
  date: firebase.firestore.Timestamp;
  duration: number;
}
