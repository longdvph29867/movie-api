import Joi from "joi";
import { password, objectId } from "./custom.validation.js";

const createMovie = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    poster: Joi.string().required(),
    director: Joi.string().required(),
    cast: Joi.array().items(Joi.string()).required(),
    genre: Joi.array().min(1).items(Joi.string().custom(objectId)).required(),
    runingTime: Joi.number().required(),
    language: Joi.string().required(),
    country: Joi.string().required(),
    trailer: Joi.string().required(),
    imgBanner: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getMovies = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMovie = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateMovie = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      poster: Joi.string(),
      director: Joi.string(),
      cast: Joi.array().items(Joi.string()),
      genre: Joi.array().min(1).items(Joi.string().custom(objectId)),
      runingTime: Joi.number(),
      language: Joi.string(),
      country: Joi.string(),
      trailer: Joi.string(),
      imgBanner: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteMovie = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export { createMovie, getMovies, getMovie, updateMovie, deleteMovie };
