import { Schema, model } from "mongoose";
import IMUser from "../../structures/interfaces/mongoose-schemas-interfaces/user-mongoose-interface";

const userSchema = new Schema<IMUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users", strict: true }
);

export default model("users", userSchema);
