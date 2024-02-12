import Genre from "../models/Genre.model.js";
import slugify from "slugify";
import genreService from "../services/genre.service.js";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

class GenresController {
  async getAll(req, res) {
    try {
      const result = await genreService.queryGenres();
      res.send(result);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async getDetail(req, res) {
    try {
      const genre = await genreService.getGenreBySlug(req.params.slug);
      if (!genre) {
        throw new ApiError(httpStatus.NOT_FOUND, "Genre not found");
      }
      res.send(genre);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const data = { ...req.body };
      data.genreSlug = slugify(data.genreName, { lower: true });
      const genre = await genreService.createGenre(data);
      res.status(httpStatus.CREATED).send(genre);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const data = { ...req.body };
      data.genreSlug = slugify(data.genreName, { lower: true });
      const genre = await genreService.updateGenreById(req.params.id, data);
      res.send(genre);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async delete(req, res) {
    try {
      await genreService.deleteGenreById(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new GenresController();
