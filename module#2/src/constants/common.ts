export const PORT = process.env.PORT || 9100;
export const PORT_FOR_DB = process.env.PORT || 5000;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  UNAUTHORIZED_401: 401,
  FORBIDDEN_403: 403,
  NOT_FOUND_404: 404,

  INTERNAL_SERVER_ERROR: 500
};

export const PERMISSIONS = ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];

export const usersDB = "Users";
export const groupsDB = "Groups";
export const userGroupDB = "UserGroup";
export const LOGIN = "login";
export const NAME = "name";
export const sortingDirection = {
  ASC: "ASC"
};

export const ACCESS_TOKEN_SECRET = "access-token-secret";
