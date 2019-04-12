import { IActivity } from "../../../interfaces/IActivity";
import { IFireStoreSDKActivity } from "./IFireStoreSDKActivity";

export const incoming = (fireStoreActivity: any): IActivity => {
  const {
    date: { nanoseconds, seconds },
    duration,
    name
  } = fireStoreActivity;
  return {
    date: new Date(seconds * 1000 + nanoseconds / 10000),
    duration,
    name
  };
};

export const outgoing = (activity: IActivity): IFireStoreSDKActivity => {
  return {
    date: {
      nanoseconds: 0, // TODO
      seconds: 0 // TODO
    },
    duration: activity.duration,
    name: activity.name
  };
};
