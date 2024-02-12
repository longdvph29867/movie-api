import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickFilter, pickOption } from "../utils/pick.js";
import movieService from "../services/movie.service.js";
import ApiError from "../utils/ApiError.js";
import actorService from "../services/actor.service.js";

class MoviesCotroller {
  async getAll(req, res) {
    try {
      const filter = pickFilter(req.query, [
        "search",
        "genre",
        "greater_time",
        "lower_time",
      ]);
      console.log(filter);
      const options = pickOption(req.query, ["sortBy", "limit", "page"]);
      options.populate = "genre";
      const result = await movieService.queryMovies(filter, options);
      res.send(result);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async getDetail(req, res) {
    try {
      const movie = await movieService.getMovieById(req.params.id);
      if (!movie) {
        throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
      }
      res.send(movie);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async create(req, res) {
    try {
      const data = { ...req.body, cast: [] };
      let movie = await movieService.createMovie(data);
      const movieId = movie._id;
      const castsMovie = [];
      for (const actorName of req.body.cast) {
        let actor = await actorService.getActorByName(actorName);
        if (!actor) {
          actor = await actorService.createActor({ name: actorName });
        }
        const actorId = actor._id;
        const movies = [...actor.movies];
        movies.push(movieId);
        actor = await actorService.updateActorById(actorId, { movies });
        castsMovie.push(actorId);
      }
      movie = await movieService.updateMovieById(movieId, {
        cast: castsMovie,
      });
      res.status(httpStatus.CREATED).send(movie);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async update(req, res) {
    try {
      const castsMovie = [];
      await actorService.deleteManyMovieInActor(req.params.id);
      for (const actorName of req.body.cast) {
        let actor = await actorService.getActorByName(actorName);
        if (!actor) {
          actor = await actorService.createActor({ name: actorName });
        }
        const actorId = actor._id;
        const movies = [...actor.movies];
        movies.push(req.params.id);
        actor = await actorService.updateActorById(actorId, { movies });
        castsMovie.push(actorId);
      }
      const data = { ...req.body, cast: castsMovie };

      const movie = await movieService.updateMovieById(req.params.id, data);
      res.send(movie);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async delete(req, res) {
    try {
      await actorService.deleteManyMovieInActor(req.params.id);
      await movieService.deleteMovieById(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      errorMessage(res, err);
    }
  }
}

export default new MoviesCotroller();
