import { IOccurence } from "../../interfaces/IOccurence";
import firebase from "../../services/firebase";
import { incoming } from "./adapter";

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
  return querySnapshot.docs.map(queryDocument =>
    incoming(queryDocument.data())
  );
};

export const create = async (
  occurence: IOccurence
): Promise<IOccurence | undefined> => {
  // TODO
  return;
};
