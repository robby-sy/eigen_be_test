import { z } from "zod";

export const borrowBookScheme = z.object({
  memberId: z.string(),
  bookId: z.string(),
});
