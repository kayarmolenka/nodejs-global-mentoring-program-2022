import { sequelize } from "../data-access";
import { GroupModel } from "../interfaces";
import { groupsDB } from "../constants";
import { DataTypes } from "sequelize";

export const Group = sequelize.define<GroupModel>(
  groupsDB,
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    permissions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    }
  },
  { freezeTableName: true, timestamps: false }
);
