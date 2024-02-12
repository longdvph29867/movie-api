import userService from "../services/user.service.js";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
class UsersCotroller {
  async getAll(req, res) {
    try {
      const filter = pickOption(req.query, ["name", "role"]);
      const options = pickOption(req.query, ["sortBy", "limit", "page"]);
      const result = await userService.queryUsers(filter, options);
      res.send(result);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async getDetail(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      res.send(user);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async create(req, res) {
    try {
      const data = { ...req.body };
      const user = await userService.createUser(req.body);
      res.status(httpStatus.CREATED).send(user);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async update(req, res) {
    try {
      const user = await userService.updateUserById(req.params.id, req.body);
      res.send(user);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async delete(req, res) {
    try {
      await userService.deleteUserById(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      errorMessage(res, err);
    }
  }
}

export default new UsersCotroller();
