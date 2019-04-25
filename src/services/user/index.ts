import { IUser } from "../../interfaces/IUser";
import firebase from "../firebase";
import { incoming, outgoing } from "./adapter";

const db = firebase.firestore();

export const list = async (): Promise<IUser[]> => {
  const querySnapshot = await db.collection(`users`).get();
  if (!querySnapshot) {
    return [];
  }
  return querySnapshot.docs.map(doc => incoming(doc.id, doc.data()));
};

export const single = async (userID: string): Promise<IUser | undefined> => {
  const doc = await db
    .collection("users")
    .doc(userID)
    .get();
  if (!doc.exists) {
    return;
  }
  return incoming(doc.id, doc.data);
};

export const upsert = async (user: IUser): Promise<void> => {
  return await db
    .collection("users")
    .doc(user.id)
    .set(outgoing(user), { merge: true });
};

export const create = async (user: IUser): Promise<void> => {
  return await db
    .collection("users")
    .doc(user.id)
    .set(outgoing(user));
};
