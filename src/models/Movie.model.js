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
    cast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actors",
      },
    ],
    genre: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genres",
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
    country: {
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
    description: {
      type: String,
      maxLength: 255,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "Movies",
    versionKey: false,
    timestamps: true,
  }
);

moviesSchema.plugin(paginate);
const Movie = mongoose.model("Movies", moviesSchema);

export default Movie;
