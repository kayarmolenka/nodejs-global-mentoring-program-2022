import { logger } from "../loaders";
import { Request, Response, NextFunction } from "express";

export const routersHandleErrors = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.json({ status: 404, title: "Not Found", msg: "Route not found" });

  logger.error(
    `You used Method: ${req.method} with Arguments: ${JSON.stringify(
      req.body
    )}, but this route Not Found`
  );
  next();
};
