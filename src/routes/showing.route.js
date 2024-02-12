import { Router } from "express";
import validate from "../middlewares/validate.js";
import showingController from "../controllers/showing.controller.js";
import {
  getByCinemaBranch,
  getByMovie,
} from "../validations/showing.validation.js";

const routerShowing = Router();
routerShowing.get("/", showingController.getAll);
routerShowing.get(
  "/by-cinema-branch",
  validate(getByCinemaBranch),
  showingController.getByCinemaBranch
);
routerShowing.get(
  "/by-movie",
  validate(getByMovie),
  showingController.getByMovie
);
routerShowing.get("/:id", showingController.getDetail);
routerShowing.post("/", showingController.create);
export default routerShowing;

/**
 * @swagger
 * tags:
 *   name: Showings
 *   description: API operations related to Showings
 */

/**
 * @swagger
 * /showings:
 *   get:
 *     summary: Get all Showings
 *     description: Only admins can retrieve all showings.
 *     tags: [Showings]
 *     responses:
 *       '200':
 *         description: The list of the showing
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /showings/by-cinema-branch:
 *   get:
 *     summary: Get all Showings
 *     description: Get all showings by cinema branch.
 *     tags: [Showings]
 *     parameters:
 *       - in: query
 *         name: cinemaBranch
 *         schema:
 *           type: string
 *         description: cinema branch slug
 *     responses:
 *       '200':
 *         description: The list of the showing
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /showings/by-movie:
 *   get:
 *     summary: Get all Showings
 *     description: Get all showings by movie.
 *     tags: [Showings]
 *     parameters:
 *       - in: query
 *         name: movie
 *         schema:
 *           type: string
 *         description: movie id
 *     responses:
 *       '200':
 *         description: The list of the showing
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /showings/{id}:
 *   get:
 *     summary: Get details of a specific showings
 *     tags: [Showings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the showings
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /showings:
 *   post:
 *     summary: Create a new Showings
 *     tags: [Showings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cinemaBranch
 *               - movie
 *               - showTime
 *               - vipPrice
 *               - normalPrice
 *             properties:
 *               cinemaBranch:
 *                 type: string
 *               movie:
 *                 type: string
 *               showTime:
 *                 type: date
 *               vipPrice:
 *                 type: number
 *               normalPrice:
 *                 type: number
 *           example:
 *             cinemaBranch: "String"
 *             movie: "String"
 *             showTime: "String"
 *             vipPrice: 0
 *             normalPrice: 0
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
