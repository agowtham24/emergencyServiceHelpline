import mongoose from "mongoose";
import { User } from "../Validations";

const UserSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
});

export const UserModel = mongoose.model("user", UserSchema);
