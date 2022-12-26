import { Request, Response } from "express";
import {
  dataBase,
  ERROR_MESSAGE,
  HTTP_STATUSES,
  userAlreadyDeletedMessage,
  userDeletedMessage
} from "../../constants";
import { v4 as id } from "uuid";
import { getAutoSuggestUsers, sortingUsersByLoginNameFunction } from "../../utils/user-operations";

export const getAllUsers = (req: Request, res: Response) => {
  const { limit, loginSubstring } = req.query;

  if (loginSubstring) {
    if (limit) {
      const findUsers = getAutoSuggestUsers(String(loginSubstring), Number(limit));

      return res.json(findUsers?.sort(sortingUsersByLoginNameFunction));
    }

    const findUsers = getAutoSuggestUsers(String(loginSubstring), undefined);
    return res.json(findUsers?.sort(sortingUsersByLoginNameFunction));
  }

  if (limit) {
    const findUsers = getAutoSuggestUsers(undefined, Number(limit));
    return res.json(findUsers?.sort(sortingUsersByLoginNameFunction));
  }

  return res.json(dataBase.users.sort(sortingUsersByLoginNameFunction));
};

export const getUserById = (req: Request, res: Response) => {
  const foundUser = dataBase.users.find((user) => user.id === req.params.userId);

  if (!foundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.json(foundUser);
};

export const updateUserById = (req: Request, res: Response) => {
  const indexFoundUser = dataBase.users.findIndex((user) => user.id === req.params.userId);

  if (!indexFoundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  const user = req.body;

  const { userId } = req.params;

  const newDataUsers = {
    ...user,
    id: userId
  };

  dataBase.users.splice(indexFoundUser, 1, newDataUsers);

  res.json(newDataUsers);
};

export const createUser = (req: Request, res: Response) => {
  const userData = req.body;

  const newUser = {
    id: id(),
    ...userData
  };

  dataBase.users.push(newUser);

  res.sendStatus(HTTP_STATUSES.CREATED_201);
};

export const deleteUserById = (req: Request, res: Response) => {
  const foundUser = dataBase.users.find((user) => user.id === req.params.userId);

  if (!foundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404).json(ERROR_MESSAGE.USER_DOES_NOT_EXIST);
    return;
  }

  if (foundUser.isDeleted) {
    res.json(userAlreadyDeletedMessage(foundUser.id));
  }

  foundUser.isDeleted = true;

  res.json(userDeletedMessage(foundUser.id));
};
