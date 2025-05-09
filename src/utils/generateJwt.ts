import jwt from "jsonwebtoken";
import config from "../config/config";

export const generateJwt = ({ id, email }: { id: string; email: string }) => {
  return jwt.sign({ id, email }, config.JWT_SECRET!, {
    expiresIn: "1h",
  });
};
