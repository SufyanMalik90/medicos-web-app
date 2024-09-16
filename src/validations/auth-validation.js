import { z } from "zod"; // Import Zod


// Define the Zod schema
export const forgotPasswordSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
  });