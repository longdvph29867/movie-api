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
    like: { type: Number, default: 0 },
    content: { type: String, maxLength: 255 },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  },
  {
    collection: "Comments",
    timestamps: true,
    verionKey: false,
  }
);

const Comment = mongoose.model("Comments", commentSchema);

export default Comment;
