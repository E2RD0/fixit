import { Request, Response, NextFunction } from "express";
import Incidence from "../../structures/classes/model-classes/incidence-class";
import { Types } from "mongoose";
import {
  ICreateIncidenceBody,
  IIncidenceResponse,
  IUpdateIncidenceBody,
} from "../../structures/interfaces/controllers-interfaces/incidence-controller-interface";
import User from "../../structures/classes/model-classes/user-class";
import IUser from "../../structures/interfaces/model-interfaces/user-model-interface";
import httpClient from "http-response-client";
import { IncidencePriorities } from "../../structures/enums/priorities-enum";
import { IncidenceStatus } from "../../structures/enums/status-enum";
import IIncidence from "../../structures/interfaces/model-interfaces/incidence-model-interface";
export default class IncidenceController {
  public static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const incidences = (await Incidence.ReadByFilter({}, false)) as IIncidence[];
      const incidencesResponse = incidences.map((incidence) => IncidenceController.formattedResponse(incidence));
      res.json(incidencesResponse);
    } catch (e) {
      next(e);
    }
  }

  public static async getIncidence(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    if (!id) {
      next(new httpClient.errors.BadRequest({ msg: "Incidence Id is required" }));
    }

    try {
      const incidence = (await Incidence.ReadByFilter({ _id: new Types.ObjectId(id) })) as IIncidence;
      res.json(IncidenceController.formattedResponse(incidence));
    } catch (e) {
      next(e);
    }
  }

  public static async createIncidence(req: Request<{}, {}, ICreateIncidenceBody>, res: Response, next: NextFunction): Promise<void> {
    const { name, description, priority, status, reportedBy, assignedTo } = req.body;

    if (!name || !description || !priority || !status || !reportedBy) {
      return next(new httpClient.errors.BadRequest({ msg: "Name, description, priority, status, and reportedUser are required" }));
    }

    try {
      if (Object.values(IncidencePriorities).indexOf(priority) === -1) {
        next(new httpClient.errors.BadRequest({ msg: "Invalid priority" }));
      }

      if (Object.values(IncidenceStatus).indexOf(status) === -1) {
        next(new httpClient.errors.BadRequest({ msg: "Invalid status" }));
      }

      if (!Types.ObjectId.isValid(reportedBy)) {
        next(new httpClient.errors.BadRequest({ msg: "Invalid reported user id" }));
      }

      const reportedUserOnDb = (await User.ReadByFilter({ _id: new Types.ObjectId(reportedBy) })) as IUser;

      if (!reportedUserOnDb) {
        next(new httpClient.errors.BadRequest({ msg: "Reporter user not found" }));
      }

      let assignedUserOnDb: IUser | undefined;

      if (assignedTo) {
        if (!Types.ObjectId.isValid(assignedTo)) {
          next(new httpClient.errors.BadRequest({ msg: "Invalid assigned user id" }));
        }
        assignedUserOnDb = (await User.ReadByFilter({ _id: new Types.ObjectId(assignedTo) })) as IUser;
        if (!assignedUserOnDb) {
          next(new httpClient.errors.BadRequest({ msg: "Assigned user not found" }));
        }
      }

      const incidence = new Incidence({
        name,
        description,
        priority,
        status,
        reportedBy: reportedUserOnDb,
        assignedTo: assignedUserOnDb,
      });
      const createdIncidence = await incidence.Create();
      res.json(IncidenceController.formattedResponse(createdIncidence));
    } catch (e) {
      next(e);
    }
  }

  public static async updateIncidence(
    req: Request<{ id: string }, {}, IUpdateIncidenceBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { name, description, priority, status, reportedBy, assignedTo } = req.body;

    if (!id || !name || !description || !priority || !status || !reportedBy) {
      next(new httpClient.errors.BadRequest({ msg: "Id, name, description, priority, status, and reportedUser are required" }));
    }

    try {
      if (Object.values(IncidencePriorities).indexOf(priority) === -1) {
        next(new httpClient.errors.BadRequest({ msg: "Invalid priority" }));
      }

      if (Object.values(IncidenceStatus).indexOf(status) === -1) {
        next(new httpClient.errors.BadRequest({ msg: "Invalid status" }));
      }

      if (!Types.ObjectId.isValid(reportedBy)) {
        next(new httpClient.errors.BadRequest({ msg: "Invalid reported user id" }));
      }

      const reportedUserOnDb = (await User.ReadByFilter({ _id: new Types.ObjectId(reportedBy) })) as IUser;

      if (!reportedUserOnDb) {
        next(new httpClient.errors.BadRequest({ msg: "Reporter user not found" }));
      }

      let assignedUserOnDb: IUser | undefined;

      if (assignedTo) {
        if (!Types.ObjectId.isValid(assignedTo)) {
          next(new httpClient.errors.BadRequest({ msg: "Invalid assigned user id" }));
        }
        assignedUserOnDb = (await User.ReadByFilter({ _id: new Types.ObjectId(assignedTo) })) as IUser;
        if (!assignedUserOnDb) {
          next(new httpClient.errors.BadRequest({ msg: "Assigned user not found" }));
        }
      }

      if (!Incidence.ReadByFilter({ _id: new Types.ObjectId(id) })) {
        next(new httpClient.errors.NotFound({ msg: "Incidence not found" }));
      }

      const incidence = new Incidence({
        id: new Types.ObjectId(id),
        name,
        description,
        priority,
        status,
        reportedBy: reportedUserOnDb,
        assignedTo: assignedUserOnDb,
      });
      const updatedIncidence = await incidence.Update();
      if (!updatedIncidence) {
        return next(new httpClient.errors.InternalServerError({ msg: "Error updating incidence" }));
      }
      res.json(IncidenceController.formattedResponse(updatedIncidence));
    } catch (e) {
      next(e);
    }
  }

  public static async deleteIncidence(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    if (!id) {
      next(new httpClient.errors.BadRequest({ msg: "Incidence Id is required" }));
    }

    try {
      const incidence = (await Incidence.ReadByFilter({ _id: new Types.ObjectId(id) })) as IIncidence;
      if (!incidence) {
        next(new httpClient.errors.NotFound({ msg: "Incidence not found" }));
      }
      await Incidence.Delete(incidence.id!);
      res.json({ msg: "Incidence deleted" });
    } catch (e) {
      next(e);
    }
  }

  private static formattedResponse(response: IIncidence): IIncidenceResponse {
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      priority: response.priority,
      status: response.status,
      date: response.date,
      reportedBy: {
        id: response.reportedBy.id,
        name: response.reportedBy.name,
      },
      assignedTo: response.assignedTo && {
        id: response.assignedTo.id,
        name: response.assignedTo.name,
      },
    };
  }
}
