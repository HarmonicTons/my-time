import { IOccurence } from "../../interfaces/IOccurence";
import * as dateAdapter from "../firebase/date/adapter";
import { IFireStoreOccurence } from "./IFireStoreOccurence";

export const incoming = (fireStoreOccurence: any): IOccurence => {
  const { date, duration, uid } = fireStoreOccurence;
  return {
    date: dateAdapter.incoming(date),
    duration,
    id: uid
  };
};

export const outgoing = (occurence: IOccurence): IFireStoreOccurence => {
  const { date, duration, id } = occurence;
  return {
    date: dateAdapter.outgoing(date),
    duration,
    uid: id
  };
};
