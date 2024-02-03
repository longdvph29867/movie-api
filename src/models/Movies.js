import mongoose from "mongoose";
import { paginate } from "./plugins/paginate.plugin.js";

const moviesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 255,
    },
    poster: {
      type: String,
      maxLength: 550,
    },
    director: {
      type: String,
      maxLength: 255,
    },
    cast: {
      type: String,
      maxLength: 255,
    },
    genre: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
      },
    ],
    runingTime: {
      type: Number,
      maxLength: 255,
    },
    language: {
      type: String,
      maxLength: 255,
    },
    rated: {
      type: String,
      maxLength: 255,
      default: 0,
    },
    trailer: {
      type: String,
      maxLength: 255,
    },
    imgBanner: {
      type: String,
      maxLength: 255,
    },
  },
  {
    collection: "Movies",
    versionKey: false,
  }
);

moviesSchema.plugin(paginate);
const Movies = mongoose.model("Movies", moviesSchema);

export default Movies;
