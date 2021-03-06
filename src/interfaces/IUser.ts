import { Moment } from "moment";
import { IActivity } from "./IActivity";

export interface IUser {
  id: string;
  name: string | null;
  email: string | null;
  lastConnection: Moment;
  activities?: IActivity;
  profilePicture?: string | null;
}
