import Joi from "joi";

const createCinemaChain = {
  body: Joi.object().keys({
    cinemaName: Joi.string().required(),
    cinemaCode: Joi.string().required(),
    logo: Joi.string().required(),
  }),
};

const getCinemaChain = {
  params: Joi.object().keys({
    slug: Joi.required(),
  }),
};

export { createCinemaChain, getCinemaChain };
