import mongoose from "mongoose";
import { Review } from "../Validations";

const reviewSchema = new mongoose.Schema<Review>({
  userId: { type: String, required: true },
  serviceId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

export const ReviewModel = mongoose.model("review", reviewSchema);
