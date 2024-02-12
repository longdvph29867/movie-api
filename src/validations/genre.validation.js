import Joi from "joi";
import { password, objectId } from "./custom.validation.js";

const createGenre = {
  body: Joi.object().keys({
    genreName: Joi.string().required(),
  }),
};

const getGenres = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getGenre = {
  params: Joi.object().keys({
    slug: Joi.required(),
  }),
};

const updateGenre = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      genreName: Joi.string(),
    })
    .min(1),
};

const deleteGenre = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export { createGenre, getGenres, getGenre, updateGenre, deleteGenre };
