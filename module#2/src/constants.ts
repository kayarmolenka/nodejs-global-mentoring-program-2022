import { mockUsers } from "./mock";

export const PORT = process.env.PORT || 9100;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const dataBase = {
  users: mockUsers
};

export const ERROR_MESSAGE = {
  USER_ALREADY_EXIST: "A user with this login already exists.",
  USER_DOES_NOT_EXIST: "The requested user does not exist."
};

export const userDeletedMessage = (id: string) => `User with the id: ${id} has been deleted.`;
export const userAlreadyDeletedMessage = (id: string) => `User with the id: ${id} already deleted.`;
