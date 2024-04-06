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
