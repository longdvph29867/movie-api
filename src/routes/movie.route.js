import { Router } from "express";
import moviesController from "../controllers/movie.controller.js";
import { checkPermission } from "../middlewares/middlewares.js";
import validate from "../middlewares/validate.js";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../validations/movie.validation.js";

const routerMovies = Router();
routerMovies.get("/", validate(getMovies), moviesController.getAll);
routerMovies.get("/trailer", moviesController.getAllTraler);

routerMovies.get("/:id", validate(getMovie), moviesController.getDetail);
routerMovies.post("/", validate(createMovie), moviesController.create);
routerMovies.put("/:id", validate(updateMovie), moviesController.update);
routerMovies.delete("/:id", validate(deleteMovie), moviesController.delete);

export default routerMovies;

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API operations related to Movies
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     description: Get all movies.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Movie name
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Movie genre id
 *       - in: query
 *         name: cast
 *         schema:
 *           type: string
 *         description: Movie cast id
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of movies
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       '200':
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get details of a specific Movies
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the Movies
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /movies/trailer:
 *   get:
 *     summary: Get all trailer movies
 *     description: Get all trailer movies.
 *     tags: [Movies]
 *     responses:
 *       '200':
 *         description: The list of the trailer movies
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new Movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - poster
 *               - director
 *               - genre
 *               - cast
 *               - runningTime
 *               - language
 *               - country
 *               - trailer
 *               - imgBanner
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               poster:
 *                 type: string
 *               director:
 *                 type: string
 *               genre:
 *                 type: string
 *               cast:
 *                 type: string
 *               runingTime:
 *                 type: number
 *               language:
 *                 type: string
 *               country:
 *                 type: string
 *               trailer:
 *                 type: string
 *               imgBanner:
 *                 type: string
 *               description:
 *                 type: string
 *           example:
 *             name: "String"
 *             poster: "String"
 *             director: "String"
 *             genre: [id_genre]
 *             cast: [name_actor]
 *             runingTime: 0
 *             language: "String"
 *             country: "String"
 *             trailer: "String"
 *             imgBanner: "String"
 *             description: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the Genre to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - poster
 *               - director
 *               - genre
 *               - cast
 *               - runningTime
 *               - language
 *               - country
 *               - trailer
 *               - imgBanner
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               poster:
 *                 type: string
 *               director:
 *                 type: string
 *               genre:
 *                 type: string
 *               cast:
 *                 type: string
 *               runingTime:
 *                 type: number
 *               language:
 *                 type: string
 *               country:
 *                 type: string
 *               trailer:
 *                 type: string
 *               imgBanner:
 *                 type: string
 *               description:
 *                 type: string
 *           example:
 *             name: "String"
 *             poster: "String"
 *             director: "String"
 *             genre: [id_genre]
 *             cast: [name_actor]
 *             runingTime: 0
 *             language: "String"
 *             country: "String"
 *             trailer: "String"
 *             imgBanner: "String"
 *             description: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movies to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Movies deleted successfully
 *               data: {}
 */
