import firebase from "../firebase";

export interface IFireStoreUser {
  name: string | null;
  email: string | null;
  lastConnection: firebase.firestore.Timestamp;
}
