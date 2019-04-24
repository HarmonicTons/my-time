import firebase from "../firebase";

export interface IFireStoreUser {
  uid: string;
  name: string | null;
  lastConnection: firebase.firestore.Timestamp;
}
