import { IActivity } from "../../interfaces/IActivity";
import { IFireStoreActivity } from "./IFireStoreActivity";

export const incoming = (fireStoreActivity: any): IActivity => {
  const { uid, name, description, color } = fireStoreActivity;
  return {
    color,
    description,
    id: uid,
    name
  };
};

export const outgoing = (activity: IActivity): IFireStoreActivity => {
  const { id, name, description, color } = activity;
  return {
    color,
    description,
    name,
    uid: id
  };
};
