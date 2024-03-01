import Comments from "../models/Comment.model.js";
import mongoose from "mongoose";

const createComment = async (commentBody) => {
  return await Comment.create(commentBody);
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

const getCommentById = async (id) => {
  return Comment.findById(id);
};

const updateComment = async (commentId, updateBody) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
};

const deleteComment = async (commentId) => {
  const deletedCommentChild = async (id) => {
    const childComment = await Comment.find({ parentCommentId: id });
    for (const comment of childComment) {
      await deletedCommentChild(comment._id);
    }
    await Comment.deleteOne({ _id: id });
  };

  deletedCommentChild(commentId);
};
const commentService = {
  createComment,
  getCommentByMovieId,
  updateComment,
  deleteComment,
};

export default commentService;
