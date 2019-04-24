import { IUser } from "src/interfaces/IUser";
import * as dateAdapter from "../firebase/date/adapter";
import { IFireStoreUser } from "./IFireStoreUser";

export const incoming = (fireStoreUser: any): IUser => {
  const { uid, name, lastConnection } = fireStoreUser;
  return {
    id: uid,
    lastConnection: dateAdapter.incoming(lastConnection),
    name
  };
};

export const outgoing = (user: IUser): IFireStoreUser => {
  const { id, name, lastConnection } = user;
  return {
    lastConnection: dateAdapter.outgoing(lastConnection),
    name,
    uid: id
  };
};
