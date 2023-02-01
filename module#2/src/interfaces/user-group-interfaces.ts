import { Model } from "sequelize";

export interface UserGroupModel extends Model {
  userId: string;
  groupId: string;
}
