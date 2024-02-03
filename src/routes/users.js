/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to user
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get details of a specific users
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the users
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - account
 *               - password
 *               - fullName
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               account:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               fullName:
 *                 type: string
 *               role:
 *                 type: string
 *           example:
 *             email: "String"
 *             account: "String"
 *             password: "String"
 *             fullName: "String"
 *             role: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The slug of the users to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - account
 *               - password
 *               - fullName
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               account:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               fullName:
 *                 type: string
 *               role:
 *                 type: string
 *           example:
 *             account: "String"
 *             email: "String"
 *             password: "String"
 *             fullName: "String"
 *             role: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the users to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

import { Router } from "express";
import usersController from "../controllers/usersController.js";
import { checkPermission } from "../middlewares/middlewares.js";

const routerUser = Router();
routerUser.get("/", usersController.getAll);
routerUser.get("/:id", usersController.getDetail);
routerUser.post("/", usersController.create);
routerUser.put("/:id", usersController.update);
routerUser.delete("/:id", usersController.delete);
export default routerUser;
