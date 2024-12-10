import { Types } from "mongoose";
import IUser from "../../interfaces/model-interfaces/user-model-interface";
import models from "../../../database/models";
import IMUser from "../../interfaces/mongoose-schemas-interfaces/user-mongoose-interface";

export default class User {
  public readonly id: Types.ObjectId;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;

  constructor(user: IUser) {
    this.id = user.id || new Types.ObjectId();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }

  public async Create(): Promise<IUser> {
    const existingUser = (await User.ReadByFilter({ email: this.email }, true)) as IUser;
    if (existingUser) return existingUser;

    const createdUser = await models.user.create({
      _id: this.id,
      ...this,
    });

    return createdUser;
  }

  public static async CreateMany(users: IUser[]): Promise<IUser[]> {
    const promises = users.map((user) => new User(user).Create());
    const result = Promise.allSettled(promises);
    return (await result)
      .map((res) => {
        if (res.status === "fulfilled") return res.value;
      })
      .filter((user): user is IUser => user !== undefined);
  }

  public async Update(): Promise<IUser | null> {
    const updatedUser = await models.user.findByIdAndUpdate(this.id, { ...this }, { new: true });
    const res = (await updatedUser) as IUser;
    return res ?? null;
  }

  public static async ReadByFilter(filter: Partial<IMUser>, oneElement: boolean = true): Promise<IUser[] | IUser> {
    const users = await models.user.find(filter);
    return oneElement ? users[0] : users;
  }

  public static async Delete(id: Types.ObjectId): Promise<IUser | null> {
    const deletedUser = await models.user.findByIdAndDelete(id);
    return deletedUser;
  }
}
