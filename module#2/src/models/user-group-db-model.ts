import { sequelize } from "../data-access";
import { userGroupDB } from "../constants";
import { User } from "./users-db-model";
import { Group } from "./groups-db-model";
import { DataTypes } from "sequelize";
import { UserGroupModal } from "../interfaces";

export const UserGroup = sequelize.define<UserGroupModal>(
  userGroupDB,
  {
    userId: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "id"
      }
    },
    groupId: {
      type: DataTypes.STRING,
      references: {
        model: Group,
        key: "id"
      }
    }
  },
  { freezeTableName: true, timestamps: false }
);

User.belongsToMany(Group, { through: UserGroup, foreignKey: "userId" });
Group.belongsToMany(User, { through: UserGroup, foreignKey: "groupId" });
