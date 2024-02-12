import mongoose from "mongoose";
import slugify from "slugify";

const genreSchema = new mongoose.Schema(
  {
    genreName: {
      type: String,
      maxLength: 255,
    },
    genreSlug: {
      type: String,
      maxLength: 255,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "Genres",
    versionKey: false,
    timestamps: true,
  }
);

genreSchema.statics.isSlugTaken = async function (genreSlug, excludeGenreId) {
  const genre = await this.findOne({ genreSlug, _id: { $ne: excludeGenreId } });
  return !!genre;
};

// genreSchema.pre("save", async function (next) {
//   const genre = this;
//   if (genre.isModified("genreName")) {
//     genre.genreSlug = slugify(genre.genreName, { lower: true });
//   }
//   next();
// });

const Genre = mongoose.model("Genres", genreSchema);

export default Genre;
