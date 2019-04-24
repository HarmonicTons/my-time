import { Moment } from "moment";
import { IActivity } from "./IActivity";

export interface IUser {
  id: string;
  name: string | null;
  lastConnection: Moment;
  activities?: IActivity;
}
