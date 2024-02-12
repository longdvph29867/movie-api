import userService from "../services/user.service.js";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import actorService from "../services/actor.service.js";
import movieService from "../services/movie.service.js";
class ActorsCotroller {
  async getAll(req, res) {
    try {
      const filter = pickOption(req.query, ["name"]);
      const options = pickOption(req.query, ["sortBy", "limit", "page"]);
      const result = await actorService.queryActors(filter, options);
      res.send(result);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async getDetail(req, res) {
    try {
      const actor = await actorService.getActorById(req.params.id);
      if (!actor) {
        throw new ApiError(httpStatus.NOT_FOUND, "Actor not found");
      }
      res.send(actor);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async create(req, res) {
    try {
      const actor = await actorService.createActor(req.body);
      res.status(httpStatus.CREATED).send(actor);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async update(req, res) {
    try {
      const actor = await actorService.updateActorById(req.params.id, req.body);
      res.send(actor);
    } catch (err) {
      console.log(err);
      errorMessage(res, err);
    }
  }

  async delete(req, res) {
    try {
      await movieService.deleteManycastInMovie(req.params.id);
      await actorService.deleteActorById(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      errorMessage(res, err);
    }
  }
}

export default new ActorsCotroller();
