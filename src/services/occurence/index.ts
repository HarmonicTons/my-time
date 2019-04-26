import { IOccurence } from "../../interfaces/IOccurence";
import firebase from "../../services/firebase";
import { incoming, outgoing } from "./adapter";

const db = firebase.firestore();

export const list = async (
  userID: string,
  activityID: string
): Promise<IOccurence[]> => {
  const querySnapshot = await db
    .collection(`users/${userID}/activities/${activityID}/occurences`)
    .get();
  if (!querySnapshot) {
    return [];
  }
  return querySnapshot.docs.map(doc => incoming(doc.id, doc.data()));
};

export const single = async (
  userID: string,
  activityID: string,
  occurenceID: string
): Promise<IOccurence | undefined> => {
  const doc = await db
    .collection(`users/${userID}/activities/${activityID}/occurences`)
    .doc(occurenceID)
    .get();
  if (!doc.exists) {
    return;
  }
  return incoming(doc.id, doc.data());
};

export const create = async (
  userID: string,
  activityID: string,
  occurence: IOccurence
): Promise<void> => {
  const collection = db.collection(
    `users/${userID}/activities/${activityID}/occurences`
  );
  let docRef;
  if (occurence.id) {
    docRef = collection.doc(occurence.id);
  } else {
    docRef = collection.doc();
  }
  return await docRef.set(outgoing(occurence));
};

export const update = async (
  userID: string,
  activityID: string,
  occurence: IOccurence
): Promise<void> => {
  return await db
    .collection(`users/${userID}/activities/${activityID}/occurences`)
    .doc(occurence.id)
    .set(outgoing(occurence), { merge: true });
};

export const remove = async (
  userID: string,
  activityID: string,
  occurenceID: string
): Promise<void> => {
  return await db
    .collection(`users/${userID}/activities/${activityID}/occurences`)
    .doc(occurenceID)
    .delete();
};
