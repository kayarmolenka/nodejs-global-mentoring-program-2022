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
import { userValidation } from "../middlewares";

const routerUsers: Router = express.Router();
const validator = createValidator();

routerUsers.get("/", getAllUsers);
routerUsers.get("/:userId", getUserById);

routerUsers.put("/:userId", validator.body(userSchema), userValidation, updateUserById);

routerUsers.post("/", validator.body(userSchema), userValidation, createUser);

routerUsers.delete("/:userId", deleteUserById);

export default routerUsers;
