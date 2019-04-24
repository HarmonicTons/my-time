import { IActivity } from "../../interfaces/IActivity";
import firebase from "../firebase";
import { incoming } from "./adapter";

const db = firebase.firestore();

export const list = async (userID: string): Promise<IActivity[]> => {
  const querySnapshot = await db.collection(`users/${userID}/activities`).get();
  if (!querySnapshot) {
    return [];
  }
  return querySnapshot.docs.map(queryDocument =>
    incoming(queryDocument.data())
  );
};

export const create = async (
  activity: IActivity
): Promise<IActivity | undefined> => {
  // TODO
  return;
};
