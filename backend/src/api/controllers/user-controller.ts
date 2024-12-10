import { NextFunction, Request, Response } from "express";
import httpClient from "http-response-client";
import IUser from "../../structures/interfaces/model-interfaces/user-model-interface";
import User from "../../structures/classes/model-classes/user-class";
import { Types } from "mongoose";
import UserUtils from "../../utils/user-utils";

export default class UserController {
  public static async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id) {
      return next(new httpClient.errors.BadRequest({ msg: "User id is required" }));
    }
    try {
      const userOnDb = (await User.ReadByFilter({ _id: new Types.ObjectId(id) })) as IUser;
      if (!userOnDb) {
        return next(new httpClient.errors.NotFound({ msg: "User not found" }));
      }
      res.json({
        id: userOnDb.id,
        name: userOnDb.name,
        email: userOnDb.email,
      });
    } catch (e) {
      next(e);
    }
  }

  public static async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new httpClient.errors.BadRequest({ msg: "Name, email and password are required" }));
    }

    try {
      if (await User.ReadByFilter({ email })) {
        return next(new httpClient.errors.Conflict({ msg: "User already exists" }));
      }
      const hashedPassword = await UserUtils.hashPassword(password);
      const user = new User({ name, email, password: hashedPassword });
      const createdUser = await user.Create();
      res.json({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      });
    } catch (e) {
      next(e);
    }
  }

  public static async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new httpClient.errors.BadRequest({ msg: "Email and password are required" }));
    }

    try {
      const user = (await User.ReadByFilter({ email }, true)) as IUser;
      if (!user) {
        return next(new httpClient.errors.NotFound({ msg: "User not found" }));
      }

      const isPasswordValid = await UserUtils.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return next(new httpClient.errors.Unauthorized({ msg: "Invalid password" }));
      }

      res.json({ token: await UserUtils.generateJWT(user) });
    } catch (e) {
      next(e);
    }
  }
}
