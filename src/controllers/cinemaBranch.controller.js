import slugify from "slugify";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import cinemaBranchService from "../services/cinema_branch.service.js";
import showingService from "../services/showing.service.js";
import { mapListMovie } from "../utils/mapShowingMovie.js";
import cinemaChainService from "../services/cinema_chains.service.js";
class CinemaBranchsCotroller {
  async getAll(req, res) {
    try {
      const filter = pickOption(req.query, []);
      if (req.query.cinemaCode) {
        const cinemaChain = await cinemaChainService.getCinemaChainByCode(
          req.query.cinemaCode
        );
        if (!cinemaChain) {
          throw new ApiError(httpStatus.NOT_FOUND, "cinemaChain null");
        }
        filter.cinema_chain_id = cinemaChain.id;
      }
      const options = pickOption(req.query, ["sortBy", "limit", "page"]);
      const result = await cinemaBranchService.queryCinemaBranchs(
        filter,
        options
      );
      const data = result.map((item) => {
        return {
          // id: item.id,
          cinemaBranchName: item.cinemaBranchName,
          cinemaBranchCode: item.cinemaBranchCode,
          slug: item.slug,
          location: item.location,
        };
      });
      res.send(data);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async getDetail(req, res) {
    try {
      const cinemaBranch = await cinemaBranchService.getCinemaBranchBySlug(
        req.params.slug
      );
      if (!cinemaBranch) {
        throw new ApiError(httpStatus.NOT_FOUND, "Cinema branch not found");
      }
      res.send(cinemaBranch);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async create(req, res) {
    try {
      const data = { ...req.body };
      data.slug = slugify(data.cinemaBranchName, { lower: true });
      const cinemaBranch = await cinemaBranchService.createCinemaBranch(data);
      res.status(httpStatus.CREATED).send(cinemaBranch);
    } catch (err) {
      errorMessage(res, err);
    }
  }
}

export default new CinemaBranchsCotroller();
