import Movies from "../models/Movies.js";
import { pickFilter, pickOption } from "../utils/pick.js";
import { movieValid } from "../validations/movies.js";

class MoviesCotroller {
  async getAll(req, res) {
    try {
      const filter = pickFilter(req.query, [
        "search",
        "genre",
        "greater_time",
        "lower_time",
      ]);
      const options = pickOption(req.query, ["sortBy", "limit", "page"]);
      options.populate = "genre";
      const data = await Movies.paginate(filter, options);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async getDetail(req, res) {
    try {
      const data = await Movies.findOne({ _id: req.params.id }).populate(
        "genre"
      );
      if (!data) {
        res.status(400).json({
          message: "Phim không tồn tại!",
        });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      // validation
      const { error } = movieValid.validate(req.body);
      if (error) {
        res.status(400).json({
          message: error.details.map((error) => error.message),
        });
        return;
      }

      const data = { ...req.body };

      const movie = await Movies.create(data);
      if (!movie) {
        res.status(404).json({
          message: "Tạo phim thất bại",
        });
        return;
      }
      res.status(200).json({ message: "Tạo phim thành công!", movie });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      // validation
      const { error } = movieValid.validate(req.body);
      if (error) {
        res.status(400).json({
          message: error.details.map((error) => error.message),
        });
        return;
      }

      const data = { ...req.body };

      const movie = await Movies.findOneAndUpdate(
        { _id: req.params.id },
        data,
        {
          new: true,
        }
      );
      if (!movie) {
        res.status(404).json({
          message: "Cập nhật phim thất bại",
        });
        return;
      }
      res.status(200).json({ message: "Cập nhật phim thành công!", movie });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const data = await Movies.findByIdAndDelete(req.params.id);
      if (!data) {
        return res.status(400).json({
          message: "Xoá thất bại!",
        });
      }
      return res.status(200).json({
        message: "Xoá thành công!",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new MoviesCotroller();
