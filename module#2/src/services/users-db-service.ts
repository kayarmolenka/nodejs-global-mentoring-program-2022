import { User } from "../models";
import { Op } from "sequelize";
import { LOGIN, sortingDirection } from "../constants";
import { User as IUser } from "../interfaces";
import { AuthService } from "./auth-service";

const authService = new AuthService();

export class UsersDbService {
  getAllUsers = async (limit?: number) => {
    return User.findAll({
      order: [[LOGIN, sortingDirection.ASC]],
      raw: true,
      limit
    });
  };

  getUserById = async (id: string) => {
    return User.findByPk(id);
  };

  getAutoSuggestUsers = async (loginSubstring?: string, limit?: number) => {
    return User.findAll({
      where: { login: { [Op.iLike]: `%${loginSubstring}%` } },
      order: [[LOGIN, sortingDirection.ASC]],
      limit
    });
  };

  createUser = async (userData: IUser) => {
    return User.create(userData);
  };

  deleteUserById = async (id: string) => {
    return User.update({ isDeleted: true }, { where: { id } });
  };

  updateUserById = async (userId: string, user: IUser) => {
    return User.update({ ...user }, { where: { id: userId } });
  };

  checkLoginAlreadyExist = async (login: string) => {
    return User.findOne({
      where: { login }
    });
  };

  login = async (login: string, password: string) => {
    const foundUser = await User.findOne({
      where: { login, password }
    });

    if (foundUser) {
      return {
        "access-token": authService.createAccessToken({
          id: foundUser.id,
          login: foundUser.login
        })
      };
    }

    return null;
  };
}
