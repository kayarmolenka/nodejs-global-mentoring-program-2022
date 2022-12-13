import { User } from "./interfaces";

export const PORT = process.env.PORT || 9100;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const mockUser: User = {
  id: "2e46a48d-6abd-4f86-ac6d-f5654bd74003",
  login: "Kos@ty007",
  password: "1234",
  age: 29,
  isDeleted: false,
};

export const dataBase = {
  users: [mockUser],
};

export const ERROR_MESSAGE = {
  USER_ALREADY_EXIST: "A user with this login already exists",
};
