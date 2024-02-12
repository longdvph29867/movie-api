import mongoose from "mongoose";
import toJSON from "./plugins/toJSON.plugin.js";
import { paginate } from "./plugins/paginate.plugin.js";
import { filter } from "./plugins/filter.plugin.js";

const cinemaChainSchema = new mongoose.Schema(
  {
    cinemaName: {
      type: String,
      required: true,
      trim: true,
    },
    cinemaCode: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "Cinema_Chains",
    versionKey: false,
  }
);

cinemaChainSchema.plugin(paginate);
cinemaChainSchema.plugin(toJSON);
cinemaChainSchema.plugin(filter);

cinemaChainSchema.statics.isCinemaChainNameTaken = async function (
  cinemaName,
  excludeUserId
) {
  const cinameChains = await this.findOne({
    cinemaName,
    _id: { $ne: excludeUserId },
  });
  return !!cinameChains;
};

const CinemaChain = mongoose.model("Cinema_Chains", cinemaChainSchema);

export default CinemaChain;
