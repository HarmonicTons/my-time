import firebase from "../firebase";

export interface IFireStoreUser {
  name: string | null;
  lastConnection: firebase.firestore.Timestamp;
}
