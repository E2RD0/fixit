import { Schema, model } from "mongoose";
import IMIncidence from "../../structures/interfaces/mongoose-schemas-interfaces/incidence-mongoose-interface";
import { IncidencePriorities } from "../../structures/enums/priorities-enum";
import { IncidenceStatus } from "../../structures/enums/status-enum";

const incidenceSchema = new Schema<IMIncidence>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: Object.values(IncidencePriorities), required: true },
    status: { type: String, enum: Object.values(IncidenceStatus), required: true },
    date: { type: Date, required: true, default: Date.now },
    reportedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "users" }
  },
  { collection: "incidents", strict: true }
);

export default model("incidents", incidenceSchema);
