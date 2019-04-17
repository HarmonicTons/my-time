import { IUser } from "../../interfaces/IUser";
import firebase from "../../services/firebase";

export const incoming = (firebaseUser: firebase.User): IUser | null => {
  if (!firebaseUser) {
    return null;
  }
  const { uid, displayName } = firebaseUser;
  return {
    id: uid,
    name: displayName
  };
};
