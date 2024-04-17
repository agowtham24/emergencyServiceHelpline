import { Request, Response } from "express";
import { userConnectedServiceSchema } from "../Validations";
import { UserConnectedServiceModel } from "../schemas/userconectedservice";
import { UserModel } from "../schemas/users";
import { mail } from "../sharedfunctions";
import { ServiceModel } from "../schemas/services";

export const createUserConnectedService = async (
  req: Request,
  res: Response
) => {
  try {
    const data = userConnectedServiceSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({ error: data.error });
    }

    const existingUserConnectedService =
      await UserConnectedServiceModel.findOne({
        userId: data.data.userId,
        serviceId: data.data.serviceId,
        status: "pending",
      });

    if (existingUserConnectedService) {
      return res.status(400).json({
        error: "User already connected to this service",
      });
    }

    const user = await UserModel.findById(data.data.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const service = await ServiceModel.findById(data.data.serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    // Send email to service provider
    const html = `<h5>Service Request</h5> <p>Message : ${data.data.message}</p> <p>From: ${user.name}</p> <p>Email: ${user.email}</p>`;
    await mail(html, service.email, "Service Request");
    const userConnectedService = new UserConnectedServiceModel(data.data);
    await userConnectedService.save();
    res.status(200).json({ message: "User connected to service" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getUserConnectedServicesByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userConnectedServices = await UserConnectedServiceModel.aggregate([
      {
        $match: {
          userId: req.params.userId,
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: "$service",
      },
    ]);

    res.status(200).json(userConnectedServices);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateStatusById = async (req: Request, res: Response) => {
  try {
    const userConnectedService = await UserConnectedServiceModel.findById(
      req.params.id
    );
    if (!userConnectedService) {
      return res
        .status(404)
        .json({ error: "User connected service not found" });
    }
    userConnectedService.status = req.body.status;
    await userConnectedService.save();
    res.status(200).json({ message: "User connected service updated" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
