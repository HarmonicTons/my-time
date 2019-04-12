import { IActivity } from "../../../interfaces/IActivity";
import { IFireStoreActivity } from "./IFireStoreRESTActivity";

export const incoming = (fireStoreActivity: IFireStoreActivity): IActivity => {
  const {
    fields: {
      date: { timestampValue: rawDate },
      duration: { integerValue: rawDuration },
      name: { stringValue: rawName }
    }
  } = fireStoreActivity;
  return {
    date: new Date(rawDate),
    duration: Number(rawDuration),
    name: rawName
  };
};
export const outgoing = (activity: IActivity): IFireStoreActivity => {
  return {
    fields: {
      date: {
        timestampValue: activity.date.toISOString()
      },
      duration: {
        integerValue: activity.duration.toString()
      },
      name: {
        stringValue: activity.name
      }
    }
  };
};
