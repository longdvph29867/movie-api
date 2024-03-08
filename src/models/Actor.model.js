import mongoose from "mongoose";
import toJSON from "./plugins/toJSON.plugin.js";
import { paginate } from "./plugins/paginate.plugin.js";

const actorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    birthday: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
      trim: true,
      default: "Updating...",
    },
    biography: {
      type: String,
      trim: true,
      default: "Updating...",
    },
    nationality: {
      type: String,
      trim: true,
      default: "Updating...",
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
        // default: [],
      },
    ],
    active: {
      type: Boolean,
      default: true,
      private: true,
    },
  },
  {
    timestamps: true,
    collection: "Actors",
    versionKey: false,
  }
);

actorSchema.plugin(paginate);
actorSchema.plugin(toJSON);

actorSchema.statics.isActorNameTaken = async function (name, excludeActorId) {
  const actor = await this.findOne({ name, _id: { $ne: excludeActorId } });
  return !!actor;
};

const Actor = mongoose.model("Actors", actorSchema);

export default Actor;
