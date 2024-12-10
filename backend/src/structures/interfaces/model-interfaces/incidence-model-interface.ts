import { Types } from "mongoose";
import { IncidencePriorities } from "../../enums/priorities-enum";
import { IncidenceStatus } from "../../enums/status-enum";
import IUser from "./user-model-interface";

export default interface IIncidence {
  id?: Types.ObjectId;
  name: string;
  description: string;
  priority: IncidencePriorities;
  status: IncidenceStatus;
  date: Date;
  reportedBy: IUser;
  assignedTo?: IUser;
}