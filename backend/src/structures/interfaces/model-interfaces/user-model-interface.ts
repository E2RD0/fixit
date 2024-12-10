import { Types } from "mongoose";

export default interface IUser {
  id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}
