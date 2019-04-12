import * as firebase from "firebase";
import "firebase/firestore";
import { IActivity } from "../../../interfaces/IActivity";
import { incoming } from "./adapter";

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "my-time-9da4e.firebaseapp.com",
  databaseURL: "https://my-time-9da4e.firebaseio.com",
  projectId: "my-time-9da4e",
  storageBucket: "my-time-9da4e.appspot.com"
};

firebase.initializeApp(firebaseConfig);

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
