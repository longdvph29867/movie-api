import httpStatus from "http-status";
import Comments from "../models/Comment.model.js";

const createComment = async (commentBody) => {
  return await Comments.create(commentBody);
};

const getCommentByMovieId = async (movieId) => {
  // lấy các comments có moviesId bằng id của movies và có parentCommentId là null
  const parentComment = await Comments.find({
    moviesId: movieId,
    parentCommentId: null,
  }).sort({ createdAt: "desc" });
  // hàm lấy các comment con có parentCommentId bằng id comment truyền vào
  const repliesComment = async (commentId) => {
    // lấy comments con từ db
    const childComments = await Comments.find({
      parentCommentId: commentId,
    }).sort({ createdAt: "asc" });
    const dataReplies = [];
    // dùng for of để lấy các comments
    for (const comment of childComments) {
      // dùng đệ quy gọi lại chính nó
      const data = await repliesComment(comment._id);
      // push vào mảng
      dataReplies.push({ ...comment.toObject(), replies: data });
    }
    return dataReplies;
  };

  const dataComments = [];
  // dùng for of để lấy các comments
  for (const comment of parentComment) {
    const data = await repliesComment(comment._id);
    dataComments.push({ ...comment.toObject(), replies: data });
  }
  return dataComments;
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
