import * as Joi from "joi";

export const createUserSchema = Joi.object().keys({
  age: Joi.number().required().min(4).max(130),
  isDeleted: Joi.boolean().required(),
  login: Joi.string().required(),
  password: Joi.string().required().pattern(new RegExp("[a-zA-Z0-9]"))
});

export const updateUserSchema = Joi.object().keys({
  age: Joi.number().min(4).max(130),
  isDeleted: Joi.boolean(),
  login: Joi.string(),
  password: Joi.string().pattern(new RegExp("[a-zA-Z0-9]"))
});
