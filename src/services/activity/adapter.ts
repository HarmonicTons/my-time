import { IActivity } from "../../interfaces/IActivity";
import { IFireStoreActivity } from "./IFireStoreActivity";

export const incoming = (uid: string, fireStoreActivity: any): IActivity => {
  const { name, description, color } = fireStoreActivity;
  return {
    color,
    description,
    id: uid,
    name
  };
};

export const outgoing = (activity: IActivity): IFireStoreActivity => {
  const { name, description, color } = activity;
  return {
    color,
    description,
    name
  };
};
