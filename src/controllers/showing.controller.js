import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import showingService from "../services/showing.service.js";
import cinemaBranchService from "../services/cinema_branch.service.js";
import {
  mapListCinemaBranch,
  mapListCinemaChain,
  mapListMovie,
} from "../utils/mapShowingMovie.js";
import movieService from "../services/movie.service.js";
import cinemaChainService from "../services/cinema_chains.service.js";
class ShowingsCotroller {
  async getAll(req, res) {
    try {
      const showingList = await showingService.queryShowings({}, {});
      res.send(showingList);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async getDetail(req, res) {
    try {
      const showing = await showingService.getShowingById(req.params.id);
      if (!showing) {
        throw new ApiError(httpStatus.NOT_FOUND, "Showing not found");
      }
      res.send(showing);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async create(req, res) {
    try {
      const showing = await showingService.createShowing(req.body);
      res.status(httpStatus.CREATED).send(showing);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async getByCinemaBranch(req, res) {
    try {
      const cinemaBranch = await cinemaBranchService.getCinemaBranchBySlug(
        req.query.cinemaBranch
      );
      if (!cinemaBranch) {
        throw new ApiError(httpStatus.NOT_FOUND, "cinema branch not found");
      }

      const filter = {
        cinemaBranch: cinemaBranch.id,
      };
      const options = { populate: "movie" };
      const showingList = await showingService.queryShowings(filter, options);
      const data = {
        id: cinemaBranch.id,
        cinemaName: cinemaBranch.cinemaBranchName,
        cinemaCode: cinemaBranch.cinemaBranchCode,
        slug: cinemaBranch.slug,
        location: cinemaBranch.location,
        showingList: mapListMovie(showingList),
      };
      res.send(data);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async getByMovie(req, res) {
    try {
      const movieId = req.query.movie;
      const movie = await movieService.getMovieById(movieId);
      if (!movie) {
        throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
      }

      const filter = {
        movie: movieId,
      };
      const options = { populate: "cinemaBranch" };
      const showingList = await showingService.queryShowings(filter, options);

      const listCinemaChain = await cinemaChainService.queryCinemaChains(
        {},
        {}
      );
      const showingData = mapListCinemaBranch(showingList);
      const data = mapListCinemaChain(listCinemaChain, showingData);
      res.send(data);
    } catch (err) {
      errorMessage(res, err);
    }
  }
}

export default new ShowingsCotroller();
