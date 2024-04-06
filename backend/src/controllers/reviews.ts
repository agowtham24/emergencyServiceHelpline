import { Request, Response } from "express";
import { ReviewModel } from "../schemas/reviews";
import { reviewSchema } from "../Validations";

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = reviewSchema.safeParse(req.body);
    if (!review.success) {
      return res.status(400).json({ error: review.error });
    }

    const existingReview = await ReviewModel.findOne({
      userId: review.data.userId,
      serviceId: review.data.serviceId,
    });

    if (existingReview) {
      return res.status(400).json({ error: "Review already exists" });
    }

    const newReview = new ReviewModel(review.data);
    await newReview.save();
    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getReviewsByService = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewModel.aggregate([
      {
        $match: {
          serviceId: req.params.serviceId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          rating: 1,
          comment: 1,
          user: {
            _id: 0,
            name: 1,
          },
        },
      },
    ]);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
