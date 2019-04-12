import axios from "axios";
import { IActivity } from "../../../interfaces/IActivity";
import { incoming, outgoing } from "./adapter";

const url =
  "https://firestore.googleapis.com/v1/projects/my-time-9da4e/databases/(default)/documents/activities";

export const list = async (): Promise<IActivity[]> => {
  const res = await axios({
    method: "get",
    url
  });
  if (!res.data.documents) {
    return [];
  }
  return res.data.documents.map(incoming);
};

export const create = async (activity: IActivity): Promise<IActivity> => {
  const res = await axios({
    data: outgoing(activity),
    method: "post",
    url
  });
  return incoming(res.data);
};
