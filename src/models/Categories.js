import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      maxLength: 255,
    },
    categorySlug: {
      type: String,
      maxLength: 255,
    },
  },
  {
    collection: "Categories",
    versionKey: false,
  }
);
const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
