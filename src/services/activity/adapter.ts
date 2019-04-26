import { IActivity } from "../../interfaces/IActivity";
import { IFireStoreActivity } from "./IFireStoreActivity";

export const incoming = (uid: string, fireStoreActivity: any): IActivity => {
  const { name, description, color, removed } = fireStoreActivity;
  return {
    color,
    description,
    id: uid,
    name,
    removed
  };
};

export const outgoing = (activity: IActivity): IFireStoreActivity => {
  const { name, description, color, removed } = activity;
  return {
    color,
    description,
    name,
    removed
  };
};
