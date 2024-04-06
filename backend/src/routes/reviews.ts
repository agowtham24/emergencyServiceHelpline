import { Router } from "express";
import { createReview, getReviewsByService } from "../controllers/reviews";

export const reviewRouter = Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/:serviceId", getReviewsByService);
