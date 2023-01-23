import * as Joi from "joi";
import { PERMISSIONS } from "../../constants";

export const createGroupSchema = Joi.object().keys({
  name: Joi.string().required(),
  permissions: Joi.array()
    .items(Joi.string().valid(...PERMISSIONS))
    .required()
});

export const updateGroupSchema = Joi.object().keys({
  name: Joi.string(),
  permissions: Joi.array()
});

export const addUsersToGroupSchema = Joi.object().keys({
  userIDs: Joi.array().items(Joi.string()).required()
});
