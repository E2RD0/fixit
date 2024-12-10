import { Types } from "mongoose";
import IIncidence from "../model-interfaces/incidence-model-interface";
import IUser from "../model-interfaces/user-model-interface";

export interface ICreateIncidenceBody extends Omit<IIncidence, "id" | "reportedBy" | "assignedTo"> {
  reportedBy: string;
  assignedTo?: string;
}

export interface IUpdateIncidenceBody extends Omit<IIncidence, "id" | "reportedBy" | "assignedTo"> {
  reportedBy: string;
  assignedTo?: string;
}

export interface IIncidenceResponse extends Omit<IIncidence, "reportedBy" | "assignedTo"> {
  reportedBy: Omit<IUser, "password" | "email">;
  assignedTo?: Omit<IUser, "password" | "email">;
}
