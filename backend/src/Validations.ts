import { z } from "zod";

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  name: z.string().nonempty({ message: "Name cannot be empty" }),
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password cannot be empty" })
    .min(6, { message: "Password must be at least 6 characters long" }),
  location: z.string().nonempty({ message: "Location cannot be empty" }),
});

export type Service = z.infer<typeof serviceSchema>;
export const serviceSchema = z.object({
  name: z.string().nonempty({ message: "Name cannot be empty" }),
  location: z.string().nonempty({ message: "Location cannot be empty" }),
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email" }),
  phone: z
    .string()
    .nonempty({ message: "Phone number cannot be empty" })
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  specialization: z.string().nonempty().optional().default(""), // Optional field
  serviceType: z.string().nonempty({ message: "Service type cannot be empty" }),
  image: z.string().nonempty({ message: "Image cannot be empty" }),
  latitude: z.number(),
  longitude: z.number(),
});

export type UserConnectedService = z.infer<typeof userConnectedServiceSchema>;
export const userConnectedServiceSchema = z.object({
  userId: z.string().nonempty({ message: "User ID cannot be empty" }),
  serviceId: z.string().nonempty({ message: "Service ID cannot be empty" }),
  message: z.string().nonempty({ message: "Message cannot be empty" }),
  status: z.string().default("pending"), // Default value
});

export type Review = z.infer<typeof reviewSchema>;
export const reviewSchema = z.object({
  userId: z.string().nonempty({ message: "User ID cannot be empty" }),
  serviceId: z.string().nonempty({ message: "Service ID cannot be empty" }),
  rating: z.number().int().min(1).max(5),
  comment: z.string().nonempty({ message: "Comment cannot be empty" }),
});
