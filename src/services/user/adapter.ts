import { IUser } from "src/interfaces/IUser";
import * as dateAdapter from "../firebase/date/adapter";
import { IFireStoreUser } from "./IFireStoreUser";

export const incoming = (uid: string, fireStoreUser: any): IUser => {
  const { name, lastConnection } = fireStoreUser;
  return {
    id: uid,
    lastConnection: dateAdapter.incoming(lastConnection),
    name
  };
};

export const outgoing = (user: IUser): IFireStoreUser => {
  const { name, lastConnection } = user;
  return {
    lastConnection: dateAdapter.outgoing(lastConnection),
    name
  };
};
