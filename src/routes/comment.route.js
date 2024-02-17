import { Router } from "express";
import { checkPermission } from "../middlewares/middlewares.js";
import validate from "../middlewares/validate.js";
import {
  createComment,
  deleteComment,
  getCommentByMovieId,
  updateComment,
} from "../validations/comment.validation.js";
import commentController from "../controllers/comment.controller.js";

const routerComment = Router();
routerComment.get(
  "/bymovie/:id",
  validate(getCommentByMovieId),
  commentController.getCommentsByMovieId
);
routerComment.post("/", validate(createComment), commentController.create);
routerComment.put("/:id", validate(updateComment), commentController.update);
routerComment.delete("/:id", validate(deleteComment), commentController.delete);

export default routerComment;
