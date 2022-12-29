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
import { userValidation } from "../middlewares";

const routerUsers: Router = express.Router();
const validator = createValidator();

routerUsers.get("/", getAllUsers);
routerUsers.get("/:userId", getUserById);

routerUsers.put("/:userId", validator.body(updateUserSchema), userValidation, updateUserById);

routerUsers.post("/", validator.body(createUserSchema), userValidation, createUser);

routerUsers.delete("/:userId", deleteUserById);

export default routerUsers;
