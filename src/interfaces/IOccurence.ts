import { Moment } from "moment";

export interface IOccurence {
  id: string;
  date: Moment;
  duration: number;
}
