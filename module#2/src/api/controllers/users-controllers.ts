import { Request, Response } from "express";
import { dataBase, ERROR_MESSAGE, HTTP_STATUSES } from "../../constants";
import { v4 as id } from "uuid";
import { getAutoSuggestUsers, isUserAlreadyExist } from "../../utils/user-operations";

export const getAllUsers = (req: Request, res: Response) => {
  const { limit, loginSubstring } = req.query;

  if (limit || loginSubstring) {
    const findUsers = getAutoSuggestUsers(String(loginSubstring), Number(limit));

    return res.json(findUsers);
  }

  return res.json(dataBase.users);
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

  if (isUserAlreadyExist(user.login)) {
    return res.status(HTTP_STATUSES.BAD_REQUEST_400).json(ERROR_MESSAGE.USER_ALREADY_EXIST);
  }

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

  if (isUserAlreadyExist(userData.login)) {
    return res.status(HTTP_STATUSES.BAD_REQUEST_400).json(ERROR_MESSAGE.USER_ALREADY_EXIST);
  }

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
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  foundUser.isDeleted = true;

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
