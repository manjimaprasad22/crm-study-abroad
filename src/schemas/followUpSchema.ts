
import { z } from "zod";

export const followUpSchema = z.object({
  type: z.string().min(1, "Activity type is required"),
  notes: z.string().min(1, "Notes are required").min(10, "Notes must be at least 10 characters"),
  outcome: z.string().min(1, "Outcome is required").min(5, "Outcome must be at least 5 characters"),
  duration: z.string().optional(),
  subject: z.string().optional(),
});

export type FollowUpFormData = z.infer<typeof followUpSchema>;
