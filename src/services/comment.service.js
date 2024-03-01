import Comments from "../models/Comment.model.js";
import mongoose from "mongoose";

const createComment = async (commentBody) => {
  return await Comments.create(commentBody);
};

const getCommentByMovieId = async (movieId) => {
  // lấy các comments có moviesId bằng id của movies và có parentCommentId là null
  const ObjectId = mongoose.Types.ObjectId;
  const comments = await Comments.aggregate([
    {
      $match: {
        moviesId: new ObjectId(movieId),
        parentCommentId: null,
      },
    },
    {
      $graphLookup: {
        from: "Comments",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parentCommentId",
        as: "replies",
        maxDepth: 10,
      },
    },
    { $sort: { createdAt: 1 } },
  ]);
  return comments;
};

const updateComment = async (commentId, commentBody) => {
  return await Comments.updateOne({ _id: commentId }, commentBody);
};

const deleteComment = async (commentId) => {
  const deletedCommentsChild = async (id) => {
    const childComments = await Comments.find({ parentCommentId: id });
    for (const childComment of childComments) {
      await deletedCommentsChild(childComment._id);
    }
    await Comments.deleteOne({ _id: id });
  };

  deletedCommentsChild(commentId);
};
const commentService = {
  createComment,
  getCommentByMovieId,
  updateComment,
  deleteComment,
};

export default commentService;
