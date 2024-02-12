import Joi from "joi";
import { password, objectId } from "./custom.validation.js";

const createActor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    birthday: Joi.date().required(),
    image: Joi.string().required(),
    biography: Joi.string().required(),
    nationality: Joi.string().required(),
    movies: Joi.array().items(Joi.string().custom(objectId)).required(),
  }),
};

const getActors = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getActor = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateActor = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      birthday: Joi.date(),
      image: Joi.string(),
      biography: Joi.string(),
      nationality: Joi.string(),
      movies: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
};

const deleteActor = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export { createActor, getActors, getActor, updateActor, deleteActor };
