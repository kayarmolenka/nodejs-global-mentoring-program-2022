import { dataBase } from "../constants";

export const isUserAlreadyExist = (login: string) => {
  return dataBase.users.some((user) => user.login === login);
};
