import { Request, Response, NextFunction } from "express";
import { isUserAlreadyExist } from "../../utils/user-operations";
import { ERROR_MESSAGE, HTTP_STATUSES } from "../../constants";

export const userValidation = (req: Request, res: Response, next: NextFunction) => {
  const isUserExist = isUserAlreadyExist(req.body.login);

  if (isUserExist) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(ERROR_MESSAGE.USER_ALREADY_EXIST);
  } else {
    next();
  }
};
