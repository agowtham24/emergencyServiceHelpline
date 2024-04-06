import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const userRegisterSchema = z.object({
  name: z.string().nonempty({ message: "Name cannot be empty" }),
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
  location: z.string().nonempty({ message: "Location cannot be empty" }),
});

export const userRegisterForm = useForm<z.infer<typeof userRegisterSchema>>({
  resolver: zodResolver(userRegisterSchema),
  defaultValues: {
    name: "",
    email: "",
    password: "",
    location: "",
  },
});

const userLoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const userLoginForm = useForm<z.infer<typeof userLoginSchema>>({
  resolver: zodResolver(userLoginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});
