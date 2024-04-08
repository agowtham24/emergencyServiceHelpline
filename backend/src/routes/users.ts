import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  loginUser,
} from "../controllers/users";

export const usersRouter = Router();

usersRouter.post("/login", loginUser);
usersRouter.post("/", createUser);
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.patch("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);
