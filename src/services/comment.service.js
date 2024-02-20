import httpStatus from "http-status";
import Comment from "../models/Comment.model.js";
import ApiError from "../utils/ApiError.js";

const createComment = async (commentBody) => {
  return await Comment.create(commentBody);
};

const getCommentByMovieId = async (movieId) => {
  // lấy các comments có moviesId bằng id của movies và có parentCommentId là null
  const parentComment = await Comment.find({
    moviesId: movieId,
    parentCommentId: null,
  }).sort({ createdAt: "desc" });
  // hàm lấy các comment con có parentCommentId bằng id comment truyền vào
  const repliesComment = async (commentId) => {
    // lấy comments con từ db
    const childComment = await Comment.find({
      parentCommentId: commentId,
    }).sort({ createdAt: "asc" });
    const dataReplies = [];
    // dùng for of để lấy các comments
    for (const comment of childComment) {
      // dùng đệ quy gọi lại chính nó
      const data = await repliesComment(comment._id);
      // push vào mảng
      dataReplies.push({ ...comment.toObject(), replies: data });
    }
    return dataReplies;
  };

  const dataComment = [];
  // dùng for of để lấy các comments
  for (const comment of parentComment) {
    const data = await repliesComment(comment._id);
    dataComment.push({ ...comment.toObject(), replies: data });
  }
  return dataComment;
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
    for (const childComment of childComment) {
      await deletedCommentChild(childComment._id);
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
