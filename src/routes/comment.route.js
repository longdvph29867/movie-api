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

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API operations related to comment
 */

/**
 * @swagger
 * /comments/bymovie/{id}:
 *   get:
 *     summary: Get comments by movie
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the movie
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moviesId
 *               - userId
 *               - content
 *               - parentCommentId
 *             properties:
 *               moviesId:
 *                 type: string
 *               userId:
 *                 type: string
 *               content:
 *                 type: string
 *               parentCommentId:
 *                 type: string
 *           example:
 *             moviesId: "objectId"
 *             userId: "objectId"
 *             content: "String"
 *             parentCommentId: "objectId"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the comment to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *           example:
 *             content: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
