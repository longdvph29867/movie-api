import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import Genre from "../models/Genre.model.js";

const createGenre = async (genreBody) => {
  if (await Genre.isSlugTaken(genreBody.genreSlug)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Genre already exists");
  }
  return await Genre.create(genreBody);
};

const queryGenres = async (filter = {}, options = {}) => {
  const genres = await Genre.aggregate([
    {
      $lookup: {
        from: "Movies",
        localField: "_id",
        foreignField: "genre",
        as: "quantity",
      },
    },
    {
      $match: {
        active: true,
      },
    },
    {
      $project: {
        _id: 1,
        genreName: 1,
        genreSlug: 1,
        quantityMovie: { $size: "$quantity" },
      },
    },
  ]);
  return genres;
};

const getGenreBySlug = async (genreSlug) => {
  return Genre.findOne({ genreSlug });
};

const getGenreById = async (id) => {
  return Genre.findById(id);
};

const updateGenreById = async (genreId, updateBody) => {
  const genre = await getGenreById(genreId);
  if (!genre) {
    throw new ApiError(httpStatus.NOT_FOUND, "Genre not found");
  }
  if (
    updateBody.genreSlug &&
    (await Genre.isSlugTaken(updateBody.genreSlug, genreId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Genre already exists");
  }
  Object.assign(genre, updateBody);
  await genre.save();
  return genre;
};

const deleteGenreById = async (genreId) => {
  const genre = await getGenreById(genreId);
  if (!genre) {
    throw new ApiError(httpStatus.NOT_FOUND, "Genre not found");
  }
  await Genre.findByIdAndUpdate(genre.id, { active: false });
  return genre;
};

const genreService = {
  createGenre,
  queryGenres,
  getGenreBySlug,
  getGenreById,
  updateGenreById,
  deleteGenreById,
};

export default genreService;
