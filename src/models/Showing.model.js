import mongoose from "mongoose";
import toJSON from "./plugins/toJSON.plugin.js";
import { paginate } from "./plugins/paginate.plugin.js";
import { filter } from "./plugins/filter.plugin.js";

const showingSchema = new mongoose.Schema(
  {
    cinemaBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinema_Branchs",
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
    },
    showTime: {
      type: Date,
      default: null,
      required: true,
    },
    vipPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    normalPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "Showings",
    versionKey: false,
  }
);

showingSchema.plugin(paginate);
showingSchema.plugin(toJSON);
showingSchema.plugin(filter);

showingSchema.statics.isShowingTaken = async function (
  showTime,
  movieId,
  branchId,
  excludeShowId
) {
  const showing = await this.findOne({
    showTime,
    movie: movieId,
    cinemaBranch: branchId,
    _id: { $ne: excludeShowId },
  });
  return !!showing;
};

const Showing = mongoose.model("Showings", showingSchema);

export default Showing;
