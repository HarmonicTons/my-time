import * as moment from "moment";
import { IUser } from "../../interfaces/IUser";
import firebase from "../../services/firebase";

export const incoming = (firebaseUser: firebase.User): IUser | null => {
  if (!firebaseUser) {
    return null;
  }
  const { uid, displayName, photoURL } = firebaseUser;
  return {
    id: uid,
    lastConnection: moment(),
    name: displayName,
    profilePicture: photoURL
  };
};
