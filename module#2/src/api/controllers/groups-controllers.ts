import { Request, Response } from "express";
import {
  addedUsersToGroupMessage,
  ERROR_MESSAGE,
  groupDeletedMessage,
  HTTP_STATUSES,
  updatedGroupMessage
} from "../../constants";
import { GroupDbService } from "../../services";
import { Group } from "../../interfaces";
import { v4 as id } from "uuid";

const groupServiceInstance = new GroupDbService();

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const foundGroup = await groupServiceInstance.getGroupById(req.params.groupId);

    if (!foundGroup) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    res.json(foundGroup);
  } catch (error) {
    console.error(error);
  }
};

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupServiceInstance.getAllGroups();
    return res.json(groups);
  } catch (error) {
    console.error(error);
  }
};

export const createGroup = async (req: Request, res: Response) => {
  try {
    const groupData: Group | undefined = req.body;

    if (groupData) {
      const isLoginExist = await groupServiceInstance.checkNameOfGroupAlreadyExist(req.body.name);

      if (isLoginExist) {
        return res.status(HTTP_STATUSES.BAD_REQUEST_400).json(ERROR_MESSAGE.GROUP_ALREADY_EXIST);
      }

      const newGroup = {
        ...groupData,
        id: id()
      };

      await groupServiceInstance.createGroup(newGroup);

      res.sendStatus(HTTP_STATUSES.CREATED_201);
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateGroupById = async (req: Request, res: Response) => {
  try {
    const foundGroup = await groupServiceInstance.getGroupById(req.params.groupId);

    if (!foundGroup) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    const isNameExist = await groupServiceInstance.checkNameOfGroupAlreadyExist(req.body.name);

    if (isNameExist) {
      return res.status(HTTP_STATUSES.BAD_REQUEST_400).json(ERROR_MESSAGE.GROUP_ALREADY_EXIST);
    }

    await groupServiceInstance.updateGroupById(foundGroup.id, req.body);

    res.json(updatedGroupMessage(foundGroup.id));
  } catch (error) {
    console.error(error);
  }
};

export const deleteGroupById = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const foundGroup = await groupServiceInstance.getGroupById(req.params.groupId);

    if (!foundGroup || !groupId) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404).json(ERROR_MESSAGE.GROUP_DOES_NOT_EXIST);
      return;
    }

    await groupServiceInstance.deleteGroupById(foundGroup.id);

    res.json(groupDeletedMessage(foundGroup.id));
  } catch (error) {
    console.error(error);
  }
};

export const addUsersToGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { userIDs } = req.body;

    if (groupId && userIDs) {
      await groupServiceInstance.addUsersToGroup(groupId, userIDs);

      return res.json(addedUsersToGroupMessage(groupId));
    }

    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  } catch (error) {
    console.error(error);
  }
};
