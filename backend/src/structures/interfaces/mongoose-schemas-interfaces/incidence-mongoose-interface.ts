import { Types } from "mongoose";
import IIncidence from "../model-interfaces/incidence-model-interface";

export default interface IMIncidence extends Omit<IIncidence, "id | reportedBy | assignedTo"> {
  _id: Types.ObjectId;
  _reportedBy: Types.ObjectId;
  _assignedTo?: Types.ObjectId;
}