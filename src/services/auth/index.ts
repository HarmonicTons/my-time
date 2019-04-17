import { IUser } from "src/interfaces/IUser";
import firebase from "../../services/firebase";
import { incoming } from "./adapter";

export const getRedirectResult = async (): Promise<IUser | null> => {
  const { user: firebaseUser } = await firebase.auth().getRedirectResult();
  return firebaseUser ? incoming(firebaseUser) : null;
};

export const onAuthStateChanged = (callback: (user: IUser | null) => void) => {
  return firebase.auth().onAuthStateChanged((firebaseUser: firebase.User) => {
    return callback(incoming(firebaseUser));
  });
};

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();
  return firebase.auth().signInWithRedirect(provider);
};

export const signOut = () => {
  return firebase.auth().signOut();
};
