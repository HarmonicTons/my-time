import { IActivity } from "../../interfaces/IActivity";
import firebase from "../firebase";
import {
  list as listOccurences,
  remove as removeOccurence
} from "../occurence";
import { incoming, outgoing } from "./adapter";

const db = firebase.firestore();

interface IFilter {
  removed?: boolean;
}

export const list = async (
  userID: string,
  { filter }: { filter: IFilter } = { filter: {} }
): Promise<IActivity[]> => {
  let collectionRef:
    | firebase.firestore.Query
    | firebase.firestore.CollectionReference;
  collectionRef = db.collection(`users/${userID}/activities`);
  if (filter.removed !== undefined) {
    collectionRef = collectionRef.where("removed", "==", filter.removed);
  }
  const querySnapshot = await collectionRef.get();

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

export const remove = async (
  userID: string,
  activityID: string
): Promise<void> => {
  await db
    .collection(`users/${userID}/activities`)
    .doc(activityID)
    .delete();

  // remove all occurences of that activity
  const occurences = await listOccurences(userID, activityID);
  const occurencesRemoving = occurences.map(
    async occurence =>
      occurence.id && removeOccurence(userID, activityID, occurence.id)
  );
  await Promise.all(occurencesRemoving);
};
