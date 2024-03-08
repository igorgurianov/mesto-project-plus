import { celebrate, Joi } from 'celebrate';

export const userIdSchema = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
  }),
});

export const userAllDataSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

export const userNameAboutSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const userAvatarSchema = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
});
