import e, { Request, Response } from "express";
import { UserSchema } from "../Validations";
import { UserModel } from "../schemas/users";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = UserSchema.safeParse(req.body);
    // console.log(user, "user");
    if (!user.success) {
      return res.status(400).json({ error: user.error });
    }
    const existingUser = await UserModel.findOne({ email: user.data.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new UserModel(user.data);
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found on that ID" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await UserModel.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found on that ID" });
    }
    await UserModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await UserModel.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found on that ID" });
    }
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found on that email" });
    }
    if (existingUser.password !== req.body.password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    res.status(200).send(existingUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
