import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import CinemaBranch from "../models/CinemaBranchs.model.js";
const createCinemaBranch = async (body) => {
  if (await CinemaBranch.isCinemaBranchNameTaken(body.cinemaName)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cinema chain already exists");
  }
  return await CinemaBranch.create(body);
};

const queryCinemaBranchs = async (filter, options) => {
  const cinemaBranchs = await CinemaBranch.filter(filter, options);
  return cinemaBranchs;
};

const getCinemaBranchBySlug = async (slug) => {
  return CinemaBranch.findOne({ slug });
};

const cinemaBranchService = {
  createCinemaBranch,
  queryCinemaBranchs,
  getCinemaBranchBySlug,
};

export default cinemaBranchService;
