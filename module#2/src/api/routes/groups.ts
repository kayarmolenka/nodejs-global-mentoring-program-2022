import express, { Router } from "express";
import { createValidator } from "express-joi-validation";
import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
  addUsersToGroup
} from "../controllers";
import { createGroupSchema, updateGroupSchema, addUsersToGroupSchema } from "../schemas";

const routerGroups: Router = express.Router();
const validator = createValidator();

routerGroups.get("/", getAllGroups);
routerGroups.get("/:groupId", getGroupById);

routerGroups.put("/:groupId", validator.body(updateGroupSchema), updateGroupById);

routerGroups.post("/", validator.body(createGroupSchema), createGroup);
routerGroups.post("/:groupId/addUsers", validator.body(addUsersToGroupSchema), addUsersToGroup);

routerGroups.delete("/:groupId", deleteGroupById);

export default routerGroups;
