import mongoose from "mongoose";
import { UserConnectedService } from "../Validations";

const userConnectedServiceSchema = new mongoose.Schema<UserConnectedService>({
  userId: {
    type: String,
    required: true,
  },
  serviceId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

export const UserConnectedServiceModel = mongoose.model(
  "userConnectedService",
  userConnectedServiceSchema
);
