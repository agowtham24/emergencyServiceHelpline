import { Router } from "express";
import {
  createUserConnectedService,
  getUserConnectedServicesByUser,
  updateStatusById,
} from "../controllers/userconectedservice";

export const userConnectedServiceRouter = Router();

userConnectedServiceRouter.post("/", createUserConnectedService);
userConnectedServiceRouter.get("/:userId", getUserConnectedServicesByUser);
userConnectedServiceRouter.patch("/:id", updateStatusById);
