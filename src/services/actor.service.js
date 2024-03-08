import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import Actor from "../models/Actor.model.js";
const createActor = async (actorBody) => {
  if (await Actor.isActorNameTaken(actorBody.name)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Actor already exists");
  }
  return await Actor.create(actorBody);
};

const queryActors = async (filter, options) => {
  const actors = await Actor.paginate(filter, options);
  return actors;
};

const getActorById = async (id) => {
  return Actor.findById(id).populate({
    path: "movies",
    select: "name poster director runningTime rated",
  });
};

const getActorByName = async (name) => {
  return Actor.findOne({ name });
};

const updateActorById = async (actorId, updateBody) => {
  const actor = await getActorById(actorId);
  if (!actor) {
    throw new ApiError(httpStatus.NOT_FOUND, "Actor not found");
  }
  if (
    updateBody.name &&
    (await Actor.isActorNameTaken(updateBody.name, actorId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Actor already taken");
  }
  Object.assign(actor, updateBody);
  await actor.save();
  return actor;
};

const deleteActorById = async (actorId) => {
  const actor = await getActorById(actorId);
  if (!actor) {
    throw new ApiError(httpStatus.NOT_FOUND, "Actor not found");
  }
  await Actor.findByIdAndUpdate(actor.id, { active: false });
  return actor;
};

const deleteManyMovieInActor = async (movieId) => {
  return Actor.updateMany({ movies: movieId }, { $pull: { movies: movieId } });
};

const actorService = {
  createActor,
  queryActors,
  getActorById,
  getActorByName,
  updateActorById,
  deleteActorById,
  deleteManyMovieInActor,
};

export default actorService;
