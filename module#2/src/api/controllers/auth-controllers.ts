import { NextFunction, Request, Response } from "express";
import { UsersDbService } from "../../services";
import { ERROR_MESSAGE, HTTP_STATUSES } from "../../constants";

const userServiceInstance = new UsersDbService();

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body;

    const permissions = await userServiceInstance.login(login, password);

    if (permissions) {
      return res.status(HTTP_STATUSES.OK_200).json(permissions);
    }

    return res.status(HTTP_STATUSES.FORBIDDEN_403).json(ERROR_MESSAGE.FORBIDDEN);
  } catch (error) {
    next(error);
  }
};
