import { Router } from "express";
import cinemaChainController from "../controllers/cinemaChain.controller.js";
import validate from "../middlewares/validate.js";
import {
  createCinemaChain,
  getCinemaChain,
} from "../validations/cinema_chain.validation.js";

const routerCinemaChain = Router();
routerCinemaChain.get("/", cinemaChainController.getAll);
routerCinemaChain.get(
  "/:slug",
  validate(getCinemaChain),
  cinemaChainController.getDetail
);
routerCinemaChain.post(
  "/",
  validate(createCinemaChain),
  cinemaChainController.create
);
export default routerCinemaChain;

/**
 * @swagger
 * tags:
 *   name: Cinema Chain
 *   description: API operations related to cinema chains
 */

/**
 * @swagger
 * /cinemachains:
 *   get:
 *     summary: Get all cinema chains
 *     description: Only admins can retrieve all cinema chains.
 *     tags: [Cinema Chain]
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /cinemachains/{slug}:
 *   get:
 *     summary: Get details of a specific cinema chains
 *     tags: [Cinema Chain]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the cinema chains
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
