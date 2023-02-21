import express, { Router } from "express";
import { createValidator } from "express-joi-validation";
import { logIn } from "../controllers";

import { authLoginSchema } from "../schemas";

const authGroups: Router = express.Router();
const validator = createValidator();

authGroups.post("/login", validator.body(authLoginSchema), logIn);

export default authGroups;
