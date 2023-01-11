export const PORT = process.env.PORT || 9100;
export const PORT_FOR_DB = process.env.PORT || 5000;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const usersDB = "Users";
export const LOGIN = "login";
export const sortingDirection = {
  ASC: "ASC"
};
