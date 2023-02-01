import { NextFunction, Request, Response } from "express";
import {
  ERROR_MESSAGE,
  HTTP_STATUSES,
  updatedMessage,
  userAlreadyDeletedMessage,
  userDeletedMessage
} from "../../constants";
import { v4 as id } from "uuid";
import { UsersDbService } from "../../services";
import { User } from "../../interfaces";

const userServiceInstance = new UsersDbService();

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, loginSubstring } = req.query;

    if (loginSubstring) {
      if (limit) {
        const findUsers = await userServiceInstance.getAutoSuggestUsers(
          String(loginSubstring),
          Number(limit)
        );

        return res.json(findUsers);
      }

      const findUsers = await userServiceInstance.getAutoSuggestUsers(
        String(loginSubstring),
        undefined
      );
      return res.json(findUsers);
    }

    if (limit) {
      const users = await userServiceInstance.getAllUsers(Number(limit));
      return res.json(users);
    }

    const users = await userServiceInstance.getAllUsers();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUser = await userServiceInstance.getUserById(req.params.userId);

    if (!foundUser) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    res.json(foundUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUser = await userServiceInstance.getUserById(req.params.userId);

    if (!foundUser) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    const isLoginExist = await userServiceInstance.checkLoginAlreadyExist(req.body.login);

    if (isLoginExist) {
      return res.status(HTTP_STATUSES.BAD_REQUEST_400).json(ERROR_MESSAGE.USER_ALREADY_EXIST);
    }

    await userServiceInstance.updateUserById(foundUser.id, req.body);

    res.json(updatedMessage(foundUser.id));
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: User | undefined = req.body;

    if (userData) {
      const isLoginExist = await userServiceInstance.checkLoginAlreadyExist(req.body.login);

      if (isLoginExist) {
        return res.status(HTTP_STATUSES.BAD_REQUEST_400).json(ERROR_MESSAGE.USER_ALREADY_EXIST);
      }

      const newUser = {
        ...userData,
        id: id()
      };

      await userServiceInstance.createUser(newUser);

      res.sendStatus(HTTP_STATUSES.CREATED_201);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const foundUser = await userServiceInstance.getUserById(req.params.userId);

    if (!foundUser || !userId) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404).json(ERROR_MESSAGE.USER_DOES_NOT_EXIST);
      return;
    }

    if (foundUser.isDeleted) {
      res.json(userAlreadyDeletedMessage(foundUser.id));
    }

    await userServiceInstance.deleteUserById(foundUser.id);

    res.json(userDeletedMessage(foundUser.id));
  } catch (error) {
    next(error);
  }
};
