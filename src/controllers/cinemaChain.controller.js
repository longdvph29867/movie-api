import slugify from "slugify";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import actorService from "../services/actor.service.js";
import movieService from "../services/movie.service.js";
import cinemaChainService from "../services/cinema_chains.service.js";
import cinemaBranchService from "../services/cinema_branch.service.js";
class CinemaChainsCotroller {
  async getAll(req, res) {
    try {
      const filter = pickOption(req.query, []);
      const options = {};
      const result = await cinemaChainService.queryCinemaChains(
        filter,
        options
      );
      const data = result.map((item) => {
        return {
          // id: item.id,
          cinemaName: item.cinemaName,
          cinemaCode: item.cinemaCode,
          slug: item.slug,
          logo: item.logo,
        };
      });
      res.send(data);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async getDetail(req, res) {
    try {
      const cinemaChain = await cinemaChainService.getCinemaChainBySlug(
        req.params.slug
      );
      if (!cinemaChain) {
        throw new ApiError(httpStatus.NOT_FOUND, "Cinema chain not found");
      }
      const filter = { cinema_chain_id: cinemaChain.id };
      const options = {};
      const cinemaBranch = await cinemaBranchService.queryCinemaBranchs(
        filter,
        options
      );
      const dataCinemaChain = {
        // id: cinemaChain.id,
        cinemaName: cinemaChain.cinemaName,
        cinemaCode: cinemaChain.cinemaCode,
        slug: cinemaChain.slug,
        logo: cinemaChain.logo,
        cinemaBranchList: cinemaBranch.map((item) => {
          return {
            cinemaBranchName: item.cinemaBranchName,
            cinemaBranchCode: item.cinemaBranchCode,
            slug: item.slug,
            location: item.location,
          };
        }),
      };
      res.send(dataCinemaChain);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async create(req, res) {
    try {
      const data = { ...req.body };
      data.slug = slugify(data.cinemaName, { lower: true });
      const cinemaChain = await cinemaChainService.createCinemaChain(data);
      res.status(httpStatus.CREATED).send(cinemaChain);
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

export default new CinemaChainsCotroller();
