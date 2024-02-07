import Joi from "joi";

export const movieValid = Joi.object({
  name: Joi.string().required(),
  poster: Joi.string().required(),
  director: Joi.string().required(),
  cast: Joi.string().required(),
  genre: Joi.array().min(1).items(Joi.string()).required(),
  runingTime: Joi.number().required(),
  language: Joi.string().required(),
  trailer: Joi.string().required(),
  imgBanner: Joi.string().required(),
}).options({ abortEarly: false });
