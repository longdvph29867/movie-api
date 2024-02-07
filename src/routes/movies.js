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
 *     tags: [Movies]
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
 *               - trailer
 *               - imgBanner
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
 *                 type: string
 *               language:
 *                 type: string
 *               trailer:
 *                 type: string
 *               imgBanner:
 *                 type: string
 *           example:
 *             name: "String"
 *             poster: "String"
 *             director: "String"
 *             genre: [String]
 *             cast: "String"
 *             runingTime: "String"
 *             language: "String"
 *             trailer: "String"
 *             imgBanner: "String"
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
 *         description: The slug of the category to be updated
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
 *               - trailer
 *               - imgBanner
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
 *                 type: string
 *               language:
 *                 type: string
 *               trailer:
 *                 type: string
 *               imgBanner:
 *                 type: string
 *           example:
 *             name: "String"
 *             poster: "String"
 *             director: "String"
 *             genre: [String]
 *             cast: "String"
 *             runingTime: "String"
 *             language: "String"
 *             trailer: "String"
 *             imgBanner: "String"
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

import { Router } from "express";
import moviesController from "../controllers/moviesController.js";
import { checkPermission } from "../middlewares/middlewares.js";

const routerMovies = Router();
routerMovies.get("/", moviesController.getAll);
routerMovies.get("/:id", moviesController.getDetail);
routerMovies.post("/", checkPermission, moviesController.create);
routerMovies.put("/:id", checkPermission, moviesController.update);
routerMovies.delete("/:id", checkPermission, moviesController.delete);
export default routerMovies;
