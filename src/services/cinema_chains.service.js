import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import CinemaChain from "../models/CinemaChain.model.js";
const createCinemaChain = async (body) => {
  if (await CinemaChain.isCinemaChainNameTaken(body.cinemaBranchName)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cinema chain already exists");
  }
  return await CinemaChain.create(body);
};

const queryCinemaChains = async (filter, options) => {
  const cinemaChains = await CinemaChain.filter(filter, options);
  return cinemaChains;
};

const getCinemaChainBySlug = async (slug) => {
  return CinemaChain.findOne({ slug });
};

const getCinemaChainByCode = async (cinemaCode) => {
  return CinemaChain.findOne({ cinemaCode });
};

const cinemaChainService = {
  createCinemaChain,
  queryCinemaChains,
  getCinemaChainByCode,
  getCinemaChainBySlug,
};

export default cinemaChainService;
