import mongoose from "mongoose";
import toJSON from "./plugins/toJSON.plugin.js";
import { paginate } from "./plugins/paginate.plugin.js";
import { filter } from "./plugins/filter.plugin.js";

const cinemaBranchSchema = new mongoose.Schema(
  {
    cinemaBranchName: {
      type: String,
      required: true,
      trim: true,
    },
    cinemaBranchCode: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    cinema_chain_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinema_Chains",
    },
  },
  {
    timestamps: true,
    collection: "Cinema_Branchs",
    versionKey: false,
  }
);

cinemaBranchSchema.plugin(paginate);
cinemaBranchSchema.plugin(filter);
cinemaBranchSchema.plugin(toJSON);

cinemaBranchSchema.statics.isCinemaBranchNameTaken = async function (
  cinemaBranchName,
  excludeUserId
) {
  const cinameBranch = await this.findOne({
    cinemaBranchName,
    _id: { $ne: excludeUserId },
  });
  return !!cinameBranch;
};

const CinemaBranch = mongoose.model("Cinema_Branchs", cinemaBranchSchema);

export default CinemaBranch;
