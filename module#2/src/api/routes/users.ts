import express, { Router } from "express";
import { createValidator } from "express-joi-validation";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById
} from "../controllers";
import { createUserSchema, updateUserSchema } from "../schemas";

const routerUsers: Router = express.Router();
const validator = createValidator();

routerUsers.get("/", getAllUsers);
routerUsers.get("/:userId", getUserById);

routerUsers.put("/:userId", validator.body(updateUserSchema), updateUserById);

routerUsers.post("/", validator.body(createUserSchema), createUser);

routerUsers.delete("/:userId", deleteUserById);

export default routerUsers;
