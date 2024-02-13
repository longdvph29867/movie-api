import Joi from "joi";
import { objectId } from "./custom.validation.js";

const createBooking = {
  body: Joi.object().keys({
    showing: Joi.string().required().custom(objectId),
    user: Joi.string().required().custom(objectId),
    seats: Joi.array()
      .min(1)
      .items(
        Joi.object({
          seatId: Joi.string().custom(objectId).required(),
          price: Joi.number().required(),
        })
      )
      .required(),
    totalPrice: Joi.number().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const deleteBooking = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export { createBooking, getUsers, getUser, deleteBooking };
