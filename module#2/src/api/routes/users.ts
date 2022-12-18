import express, { Router } from "express";
import { createValidator } from "express-joi-validation";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById
} from "../controllers";
import { userSchema } from "../schemas";

const routerUsers: Router = express.Router();
const validator = createValidator();

routerUsers.get("/", getAllUsers);
routerUsers.get("/:userId", getUserById);

routerUsers.put("/:userId", validator.body(userSchema), updateUserById);

routerUsers.post("/", validator.body(userSchema), createUser);

routerUsers.delete("/:userId", deleteUserById);

export default routerUsers;
