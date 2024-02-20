import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import commentService from "../services/comment.service.js";
class CommentsController {
  async getCommentsByMovieId(req, res) {
    try {
      const movieId = req.params.id;
      const result = await commentService.getCommentByMovieId(movieId);
      res.send(result);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async create(req, res) {
    try {
      const { parentCommentId = null } = req.body;
      const data = { ...req.body, parentCommentId: parentCommentId };
      const comment = await commentService.createComment(data);
      res.status(httpStatus.CREATED).send(comment);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async update(req, res) {
    try {
      const comment = await commentService.updateComment(
        req.params.id,
        req.body
      );
      res.send(comment);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async delete(req, res) {
    try {
      await commentService.deleteComment(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      errorMessage(res, err);
    }
  }
}

export default new CommentsController();
