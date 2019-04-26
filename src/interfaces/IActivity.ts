import { IOccurence } from "./IOccurence";

export interface IActivity {
  id?: string;
  name: string;
  description?: string;
  color: string;
  occurences?: IOccurence;
  removed: boolean;
}
