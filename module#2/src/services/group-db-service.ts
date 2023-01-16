import { Group, UserGroup } from "../models";
import { NAME, sortingDirection } from "../constants";
import { Group as IGroup } from "../interfaces";
import { sequelize } from "../data-access";

export class GroupDbService {
  getGroupById = async (id: string) => {
    return Group.findByPk(id);
  };

  getAllGroups = async () => {
    return Group.findAll({
      order: [[NAME, sortingDirection.ASC]],
      raw: true
    });
  };

  createGroup = async (groupData: IGroup) => {
    return Group.create(groupData);
  };

  deleteGroupById = async (id: string) => {
    return Group.destroy({ where: { id } });
  };

  updateGroupById = async (groupId: string, group: IGroup) => {
    return Group.update({ ...group }, { where: { id: groupId } });
  };

  checkNameOfGroupAlreadyExist = async (name: string) => {
    return Group.findOne({
      where: { name }
    });
  };

  addUsersToGroup = async (groupId: string, userIds: string[]) =>
    sequelize.transaction(async (transaction) => {
      for (const userId of userIds) {
        await UserGroup.create({ userId, groupId }, { transaction });
      }
    });
}
