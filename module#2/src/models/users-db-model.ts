import { sequelize } from "../data-access";
import { UserModel } from "../interfaces";
import { usersDB } from "../constants";
import { DataTypes } from "sequelize";

export const User = sequelize.define<UserModel>(
  usersDB,
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },

    login: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: new RegExp("[a-zA-Z0-9]")
      }
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 4,
        max: 130
      }
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  { freezeTableName: true, timestamps: false }
);
