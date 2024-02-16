import Joi from "joi";

const getSeats = {
  query: Joi.object().keys({
    showing: Joi.string().required(),
  }),
};

export { getSeats };
