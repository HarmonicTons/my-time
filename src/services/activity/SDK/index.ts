import { IActivity } from "../../../interfaces/IActivity";
import { firebase } from "../../../services/firebase";
import { incoming } from "./adapter";

const db = firebase.firestore();

export const list = async (): Promise<IActivity[]> => {
  const querySnapshot = await db.collection("activities").get();
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
