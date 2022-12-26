import * as Joi from "joi";

export const userSchema = Joi.object().keys({
  age: Joi.number().required().min(4).max(130),
  isDeleted: Joi.boolean().required(),
  login: Joi.string().required(),
  password: Joi.string().required().pattern(new RegExp("[a-zA-Z0-9]"))
});
