
import { z } from "zod";

export const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required").min(10, "Phone number must be at least 10 digits"),
  source: z.string().min(1, "Lead source is required"),
  country: z.string().min(1, "Preferred country is required"),
  program: z.string().optional(),
  budget: z.string().optional(),
  notes: z.string().optional()
});

export type LeadFormData = z.infer<typeof leadSchema>;
