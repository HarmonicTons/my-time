import { IUser } from "src/interfaces/IUser";
import firebase from "../../services/firebase";
import { upsert } from "../../services/user";
import { incoming } from "./adapter";

export const getRedirectResult = async (): Promise<IUser | null> => {
  const { user: firebaseUser } = await firebase.auth().getRedirectResult();
  return firebaseUser ? incoming(firebaseUser) : null;
};

export const onAuthStateChanged = (callback: (user: IUser | null) => void) => {
  return firebase
    .auth()
    .onAuthStateChanged(async (firebaseUser: firebase.User) => {
      const user = incoming(firebaseUser);
      if (user) {
        await upsert(user);
      }
      return callback(user);
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
