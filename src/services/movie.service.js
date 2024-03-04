import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import Movie from "../models/Movie.model.js";

const createMovie = async (movieBody) => {
  return await Movie.create(movieBody);
};

const queryMovies = async (filter, options) => {
  const movies = await Movie.paginate(filter, options);
  return movies;
};

const getMovieById = async (id) => {
  return Movie.findById(id).populate([
    { path: "cast", select: "id name" },
    { path: "genre", select: "id genreName genreSlug" },
  ]);
};

const updateMovieById = async (movieId, updateBody) => {
  const movie = await getMovieById(movieId);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
  }
  Object.assign(movie, updateBody);
  await movie.save();
  return movie;
};

const deleteMovieById = async (movieId) => {
  const movie = await getMovieById(movieId);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
  }
  await Movie.findByIdAndUpdate(movie.id, { active: false });
  return movie;
};

const deleteManycastInMovie = async (castId) => {
  return Movie.updateMany({ cast: castId }, { $pull: { cast: castId } });
};

const queryMovieTrailer = async () => {
  const trailers = await Movie.find(
    {},
    { trailer: 1, name: 1, imgBanner: 1, language: 1 }
  );
  return trailers;
};

const movieService = {
  createMovie,
  queryMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  deleteManycastInMovie,
  queryMovieTrailer,
};

export default movieService;
