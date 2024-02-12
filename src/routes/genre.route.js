import { Router } from "express";
import { checkPermission } from "../middlewares/middlewares.js";
import genreController from "../controllers/genre.controller.js";
import validate from "../middlewares/validate.js";
import {
  createGenre,
  deleteGenre,
  getGenre,
  getGenres,
  updateGenre,
} from "../validations/genre.validation.js";

const routerGenre = Router();
routerGenre.get("/", validate(getGenres), genreController.getAll);
routerGenre.get("/:slug", validate(getGenre), genreController.getDetail);
routerGenre.post("/", validate(createGenre), genreController.create);
routerGenre.put("/:id", validate(updateGenre), genreController.update);
routerGenre.delete("/:id", validate(deleteGenre), genreController.delete);

export default routerGenre;

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: API operations related to genres
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       '200':
 *         description: The list of the genres
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /genres/{slug}:
 *   get:
 *     summary: Get details of a specific genre
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the genre
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - genreName
 *             properties:
 *               genreName:
 *                 type: string
 *           example:
 *             genreName: "New Genre"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Update a genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the genre to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - genreName
 *             properties:
 *               genreName:
 *                 type: string
 *           example:
 *             genreName: "Updated Genre"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Delete a genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the genre to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
