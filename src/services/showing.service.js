import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import Showing from "../models/Showing.model.js";
const createShowing = async (body) => {
  if (
    await Showing.isShowingTaken(body.showTime, body.movie, body.cinemaBranch)
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cinema chain already exists");
  }
  return await Showing.create(body);
};

const queryShowings = async (filter, options) => {
  const showings = await Showing.filter(filter, options);
  return showings;
};

const getShowingById = async (id) => {
  return Showing.findById(id)
    .populate({
      path: "cinemaBranch",
      select: "cinemaBranchName slug location",
    })
    .populate({
      path: "movie",
      select:
        "name poster director runningTime language rated trailer imgBanner",
    });
};

const showingService = {
  createShowing,
  queryShowings,
  getShowingById,
};

export default showingService;
