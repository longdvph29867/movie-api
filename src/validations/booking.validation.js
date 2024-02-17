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
          seatNumber: Joi.number().required(),
          price: Joi.number().required(),
        })
      )
      .required(),
    totalPrice: Joi.number().required(),
  }),
};

const getBookingByUser = {
  query: Joi.object().keys({
    user: Joi.string().required(),
  }),
};

const deleteBooking = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export { createBooking, getBookingByUser, deleteBooking };
