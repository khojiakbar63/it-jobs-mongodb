import { z } from "zod";

export const validateApplicant = (data: any) => {
  const schema = z.object({
    user: z.string({required_error:  "User ID is required"}),
    job: z.string({required_error:  "Job ID is required"}),
    notes: z.string({required_error:  "Notes is required"}),
    resumeUrl: z.string({required_error:  "Resume URL is required"})
  });
  return schema.parse(data)
};
