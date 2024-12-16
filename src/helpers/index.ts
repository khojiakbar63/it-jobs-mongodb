import jwt from "jsonwebtoken";

export const generateToken = (
  payload: object,
  secretKey: string,
  expiresIn = "1d"
) =>
  jwt.sign(payload, secretKey, {
    expiresIn,
  });
