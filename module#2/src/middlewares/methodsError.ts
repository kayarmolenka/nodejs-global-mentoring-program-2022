import { logger } from "../loaders";
import { Request, Response } from "express";

export const methodsError = (err: Error, req: Request, res: Response) => {
  if (!err.message) {
    return;
  }

  logger.error(
    `Method: ${req.method}; Arguments: ${JSON.stringify(req.body)}; Error: ${err.message}`
  );
  res.status(500).send("Internal Server Error");
};
