import { Model } from "sequelize";

export interface UserGroupModal extends Model {
  userId: string;
  groupId: string;
}
