import Joi from "joi";

const createCinemaChain = {
  body: Joi.object().keys({
    cinemaName: Joi.string().required(),
    cinemaCode: Joi.string().required(),
    logo: Joi.string().required(),
  }),
};

const getByCinemaBranch = {
  query: Joi.object().keys({
    cinemaBranch: Joi.string().required(),
  }),
};

const getByMovie = {
  query: Joi.object().keys({
    movie: Joi.string().required(),
  }),
};
export { createCinemaChain, getByCinemaBranch, getByMovie };
