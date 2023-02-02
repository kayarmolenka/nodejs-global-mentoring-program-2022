import * as Joi from "joi";

export const authLoginSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required()
});
