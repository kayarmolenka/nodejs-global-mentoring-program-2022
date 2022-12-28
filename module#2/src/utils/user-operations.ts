import { dataBase } from "../constants";
import { User } from "../interfaces";

export const isUserAlreadyExist = (login: string) => {
  return dataBase.users.some((user) => user.login === login);
};

export const getAutoSuggestUsers = (loginSubstring?: string, limit?: number) => {
  if (loginSubstring) {
    const matcher = new RegExp(`^${loginSubstring}`, "gi");
    const findMatchedUsers = dataBase.users.filter((user) => user.login.match(matcher));

    if (limit) {
      return findMatchedUsers.splice(0, Number(limit));
    }

    return findMatchedUsers;
  }

  if (limit) {
    return dataBase.users.splice(0, Number(limit));
  }
};

export const sortingUsersByLoginNameFunction = (a: User, b: User) => a.login.localeCompare(b.login);
