import { IActivity } from "../../interfaces/IActivity";
import firebase from "../firebase";
import { incoming, outgoing } from "./adapter";

const db = firebase.firestore();

export const list = async (userID: string): Promise<IActivity[]> => {
  const querySnapshot = await db.collection(`users/${userID}/activities`).get();
  if (!querySnapshot) {
    return [];
  }
  return querySnapshot.docs.map(doc => incoming(doc.id, doc.data()));
};

export const single = async (
  userID: string,
  activityID: string
): Promise<IActivity | undefined> => {
  const doc = await db
    .collection(`users/${userID}/activities`)
    .doc(activityID)
    .get();
  if (!doc.exists) {
    return;
  }
  return incoming(doc.id, doc.data());
};

export const create = async (
  userID: string,
  activity: IActivity
): Promise<void> => {
  const collection = db.collection(`users/${userID}/activities`);
  let docRef;
  if (activity.id) {
    docRef = collection.doc(activity.id);
  } else {
    docRef = collection.doc();
  }
  return await docRef.set(outgoing(activity));
};

export const update = async (
  userID: string,
  activity: IActivity
): Promise<void> => {
  return await db
    .collection(`users/${userID}/activities`)
    .doc(activity.id)
    .set(outgoing(activity), { merge: true });
};
