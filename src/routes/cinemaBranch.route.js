import { Router } from "express";
import validate from "../middlewares/validate.js";
import cinemaBranchController from "../controllers/cinemaBranch.controller.js";

const routerCinemaBranch = Router();
routerCinemaBranch.get("/", cinemaBranchController.getAll);
routerCinemaBranch.get("/:slug", cinemaBranchController.getDetail);
routerCinemaBranch.post("/", cinemaBranchController.create);
export default routerCinemaBranch;

/**
 * @swagger
 * tags:
 *   name: Cinema Branch
 *   description: API operations related to cinema branchs
 */

/**
 * @swagger
 * /cinemabranchs:
 *   get:
 *     summary: Get all cinema branchs
 *     description: Only admins can retrieve all cinema branchs.
 *     tags: [Cinema Branch]
 *     parameters:
 *       - in: query
 *         name: cinemaCode
 *         schema:
 *           type: string
 *         description: cinema chain code
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /cinemabranchs/{slug}:
 *   get:
 *     summary: Get details of a specific cinema branchs
 *     tags: [Cinema Branch]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the cinema branchs
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
