import jwt from "jsonwebtoken";

export const verifyToken = (token: string | undefined) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded; // Returns user object (including role) if valid
  } catch (error) {
    console.error("Invalid token:", (error as Error).message);
    return null;
  }
};
