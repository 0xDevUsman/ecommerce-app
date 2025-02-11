import zod from "zod";

export const registerUser = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});
