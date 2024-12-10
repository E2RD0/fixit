import { Types } from "mongoose";
import IIncidence from "../model-interfaces/incidence-model-interface";

export interface ICreateIncidenceBody extends Omit<IIncidence, "id | reportedBy | assignedTo"> {
  reportedUser: string;
  assignedUser?: string;
}

export interface IUpdateIncidenceBody extends Omit<IIncidence, "id, reportedBy | assignedTo"> {
  reportedUser: string;
  assignedUser?: string;
}
