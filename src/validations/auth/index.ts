import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),  // Ensure non-empty string
  surname: z.string().min(1, { message: "Surname is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email format!" })
    .min(1, { message: "Email is required!" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters!" }),
});

export type SignUpData = z.infer<typeof signUpSchema>;

export const validateSignUp = (data: any): SignUpData => {
  return signUpSchema.parse(data);  // Will throw if validation fails
};




export const validateSignIn = (data: any) => {
  const schema = z.object({
    email: z
      .string({ required_error: "Email is required!" })
      .email({ message: "Invalid email!" }),
    password: z.string({ required_error: "Password is required!" }),
  });

  return schema.parse(data);
};