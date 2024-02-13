import { Router } from "express";
import usersController from "../controllers/user.controller.js";
import { checkPermission } from "../middlewares/middlewares.js";
import validate from "../middlewares/validate.js";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../validations/user.validation.js";
import actorController from "../controllers/actor.controller.js";
import {
  createActor,
  getActor,
  updateActor,
} from "../validations/actor.validation.js";

const routerActor = Router();
routerActor.get("/", validate(getActor), actorController.getAll);
routerActor.get("/:id", validate(getActor), actorController.getDetail);
routerActor.post("/", validate(createActor), actorController.create);
routerActor.put("/:id", validate(updateActor), actorController.update);
routerActor.delete("/:id", validate(deleteUser), actorController.delete);
export default routerActor;

/**
 * @swagger
 * tags:
 *   name: Actors
 *   description: API operations related to actors
 */

/**
 * @swagger
 * /actors:
 *   get:
 *     summary: Get all Actors
 *     description: Only admins can retrieve all Actors.
 *     tags: [Actors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of actors
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /Actors/{id}:
 *   get:
 *     summary: Get details of a specific Actors
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the Actors
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /actors:
 *   post:
 *     summary: Create a new actors
 *     tags: [Actors]
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
 *               - birthday
 *               - image
 *               - biography
 *               - nationality
 *               - movies
 *             properties:
 *               name:
 *                 type: string
 *               birthday:
 *                 type: Date
 *               image:
 *                 type: string
 *               biography:
 *                 type: string
 *               nationality:
 *                 type: string
 *               movies:
 *                 type: string
 *           example:
 *             name: "String"
 *             birthday: "2024-01-18T16:00:00Z"
 *             image: "String"
 *             biography: "String"
 *             nationality: "String"
 *             movies: [String]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /actors/{id}:
 *   put:
 *     summary: Update a actors
 *     tags: [Actors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The slug of the actors to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthday
 *               - image
 *               - biography
 *               - nationality
 *               - movies
 *             properties:
 *               name:
 *                 type: string
 *               birthday:
 *                 type: Date
 *               image:
 *                 type: string
 *               biography:
 *                 type: string
 *               nationality:
 *                 type: string
 *               movies:
 *                 type: string
 *           example:
 *             name: "String"
 *             birthday: "2024-01-18T16:00:00Z"
 *             image: "String"
 *             biography: "String"
 *             nationality: "String"
 *             movies: [String]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /actors/{id}:
 *   delete:
 *     summary: Delete a actors
 *     tags: [Actors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the actors to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
