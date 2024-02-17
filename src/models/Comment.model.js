import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    moviesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    content: { type: String, maxLength: 255 },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  },
  {
    collection: "Comments",
    versionKey: false,
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;
