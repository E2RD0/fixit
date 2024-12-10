import { Types } from "mongoose";
import IUser from "../model-interfaces/user-model-interface";

export default interface IMUser extends Omit<IUser, "id"> {
  _id: Types.ObjectId;
} 