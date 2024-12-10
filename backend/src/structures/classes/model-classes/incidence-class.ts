import { Types } from "mongoose";
import models from "../../../database/models";
import { IncidencePriorities } from "../../enums/priorities-enum";
import { IncidenceStatus } from "../../enums/status-enum";
import IIncidence from "../../interfaces/model-interfaces/incidence-model-interface";
import IUser from "../../interfaces/model-interfaces/user-model-interface";
import IMIncidence from "../../interfaces/mongoose-schemas-interfaces/incidence-mongoose-interface";

export default class Incidence {
  public readonly id: Types.ObjectId;
  public readonly name: string;
  public readonly description: string;
  public readonly priority: IncidencePriorities;
  public readonly status: IncidenceStatus;
  public readonly date?: Date;
  private _reportedBy: IUser;
  private _assignedTo?: IUser;

  constructor(incidence: IIncidence) {
    this.id = incidence.id || new Types.ObjectId();
    this.name = incidence.name;
    this.description = incidence.description;
    this.priority = incidence.priority;
    this.status = incidence.status;
    this.date = incidence.date;
    this._reportedBy = incidence.reportedBy;
    this._assignedTo = incidence.assignedTo;
  }

  public get reportedBy(): IUser {
    return this._reportedBy;
  }

  public set reportedBy(user: IUser) {
    this._reportedBy = user;
  }

  public get assignedTo(): IUser | undefined {
    return this._assignedTo;
  }

  public set assignedTo(user: IUser | undefined) {
    this._assignedTo = user;
  }

  public async Create(): Promise<IIncidence> {
    const createdIncidence = await models.incidence.create({
      ...this,
      reportedBy: this.reportedBy.id,
      assignedTo: this.assignedTo?.id,
    });

    return createdIncidence;
  }

  public async Update(): Promise<IIncidence | null> {
    const updatedIncidence = await models.incidence.findByIdAndUpdate(
      this.id,
      {
        name: this.name,
        description: this.description,
        priority: this.priority,
        status: this.status,
        date: this.date,
        reportedBy: this.reportedBy.id!,
        assignedTo: this.assignedTo?.id!,
      },
      { new: true }
    );

    const res = (await (await updatedIncidence?.populate("reportedBy"))?.populate("assignedTo")) as IIncidence;
    return res ?? null;
  }

  public static async ReadByFilter(filter: Partial<IMIncidence>, oneElement: boolean = true): Promise<IIncidence[] | IIncidence> {
    const incidences = (await models.incidence.find(filter).populate("reportedBy").populate("assignedTo")) as IIncidence[];
    return oneElement ? incidences[0] : incidences;
  }

  public static async Delete(id: string | Types.ObjectId): Promise<IIncidence | null> {
    const deletedIncidence = await models.incidence.findByIdAndDelete(id);
    return deletedIncidence ?? null;
  }
}
