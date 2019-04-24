import * as moment from "moment";
import firebase from "../index";

export const incoming = (
  fireStoreDate: firebase.firestore.Timestamp
): moment.Moment => {
  return moment(fireStoreDate.seconds * 1000);
};

export const outgoing = (date: moment.Moment): firebase.firestore.Timestamp => {
  return firebase.firestore.Timestamp.fromDate(new Date(date.valueOf()));
};
