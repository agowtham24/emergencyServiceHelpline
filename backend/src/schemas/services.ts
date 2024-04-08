import mongoose from "mongoose";
import { Service } from "../Validations";

const serviceSchema = new mongoose.Schema<Service>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  specialization: { type: String, default: "" },
  serviceType: { type: String, required: true },
  image: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

export const ServiceModel = mongoose.model("service", serviceSchema);
