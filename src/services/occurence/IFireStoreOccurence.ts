import firebase from "../firebase";

export interface IFireStoreOccurence {
  uid: string;
  date: firebase.firestore.Timestamp;
  duration: number;
}
