import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export interface Group {
  id: string;
  name: string;
  permissions: Array<Permission>;
}

export interface GroupModel
  extends Model<InferAttributes<GroupModel>, InferCreationAttributes<GroupModel>> {
  id: string;
  name: string;
  permissions: Array<Permission>;
}
