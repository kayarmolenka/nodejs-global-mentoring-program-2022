import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, ERROR_MESSAGE, HTTP_STATUSES } from "../constants";

export const checkTokenAccess = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log(!token);
    return res.status(HTTP_STATUSES.UNAUTHORIZED_401).json(ERROR_MESSAGE.DID_NOT_PROVIDE_TOKEN);
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(HTTP_STATUSES.FORBIDDEN_403).json(ERROR_MESSAGE.FORBIDDEN);
    } else {
      next();
    }
  });
};
