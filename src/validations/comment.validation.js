import Joi from "joi";
import { objectId } from "./custom.validation.js";

const createComment = {
  body: Joi.object().keys({
    moviesId: Joi.string().required().custom(objectId),
    userId: Joi.string().required().custom(objectId),
    content: Joi.string().required(),
    parentCommentId: Joi.optional().custom(objectId),
  }),
};
const updateComment = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};
const deleteComment = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};
const getCommentByMovieId = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};
export { createComment, updateComment, deleteComment, getCommentByMovieId };
