import { Auth } from "../interfaces";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constants";

export class AuthService {
  createAccessToken = (payload: Auth) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
  };
}
