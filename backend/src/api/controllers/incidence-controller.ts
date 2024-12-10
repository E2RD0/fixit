import { Request, Response, NextFunction } from "express";
import Incidence from "../../structures/classes/model-classes/incidence-class";
import { Types } from "mongoose";
import IIncidence from "../../structures/interfaces/model-interfaces/incidence-model-interface";
import { ICreateIncidenceBody, IUpdateIncidenceBody } from "../../structures/interfaces/controllers-interfaces/incidence-controller-interface";
import User from "../../structures/classes/model-classes/user-class";
import IUser from "../../structures/interfaces/model-interfaces/user-model-interface";

export default class IncidenceController {
  public static async getIncidences(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const incidences = await Incidence.ReadByFilter({}, false);
      res.json(incidences);
    } catch (e) {
      next(e);
    }
  }

  public static async getIncidence(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    if (!id) {
      return next({ msg: "Incidence id is required" });
    }

    try {
      const incidence = await Incidence.ReadByFilter({ _id: new Types.ObjectId(id) }, false);
      res.json(incidence);
    } catch (e) {
      next(e);
    }
  }

  public static async createIncidence(req: Request<{}, {}, ICreateIncidenceBody>, res: Response, next: NextFunction): Promise<void> {
    const { name, description, priority, status, date, reportedUser, assignedUser } = req.body;

    if (!name || !description || !priority || !status || !date || !reportedUser) {
      return next({ msg: "Name, description, priority, status, date and reportedUser are required" });
    }

    const reportedUserOnDb = (await User.ReadByFilter({ _id: new Types.ObjectId(reportedUser) })) as IUser;

    if (!reportedUserOnDb) {
      return next({ msg: "Reporter user not found" });
    }

    let assignedUserOnDb: IUser | undefined;

    if (assignedUser) {
      assignedUserOnDb = (await User.ReadByFilter({ _id: new Types.ObjectId(assignedUser) })) as IUser;
      if (!assignedUserOnDb) {
        return next({ msg: "Assigned user not found" });
      }
    }

    try {
      const incidence = new Incidence({
        name,
        description,
        priority,
        status,
        date,
        reportedBy: reportedUserOnDb,
        assignedTo: assignedUserOnDb,
      });
      const createdIncidence = await incidence.Create();
      res.json(createdIncidence);
    } catch (e) {
      next(e);
    }
  }

  public static async updateIncidence(req: Request<{}, {}, IUpdateIncidenceBody>, res: Response, next: NextFunction): Promise<void> {
    const { id, name, description, priority, status, date, reportedUser, assignedUser } = req.body;


    if (!id || !name || !description || !priority || !status || !date || !reportedUser) {
      return next({ msg: "Id, Name, description, priority, status, date and reportedUser are required" });
    }

    const reportedUserOnDb = (await User.ReadByFilter({ _id: new Types.ObjectId(reportedUser) })) as IUser;

    if (!reportedUserOnDb) {
      return next({ msg: "Reporter user not found" });
    }

    let assignedUserOnDb: IUser | undefined;

    if (assignedUser) {
      assignedUserOnDb = (await User.ReadByFilter({ _id: new Types.ObjectId(assignedUser) })) as IUser;
      if (!assignedUserOnDb) {
        return next({ msg: "Assigned user not found" });
      }
    }

    try {
      const incidence = new Incidence({
        id: id,
        name,
        description,
        priority,
        status,
        date,
        reportedBy: reportedUserOnDb,
        assignedTo: assignedUserOnDb,
      });
      const updatedIncidence = await incidence.Update();
      res.json(updatedIncidence);
    } catch (e) {
      next(e);
    }
  }
}
