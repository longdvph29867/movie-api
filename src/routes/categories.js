/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API operations related to categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /categories/{slug}:
 *   get:
 *     summary: Get details of a specific category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the category
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *           example:
 *             categoryName: "New Category"
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
 * /categories/{slug}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the category to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *           example:
 *             categoryName: "Updated Category"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";
import { checkPermission } from "../middlewares/middlewares.js";

const routerCategory = Router();
routerCategory.get("/", categoriesController.getAll);
routerCategory.get("/:slug", categoriesController.getDetail);
routerCategory.post("/", categoriesController.create);
routerCategory.put("/:slug", categoriesController.update);
routerCategory.delete("/:id", categoriesController.delete);

export default routerCategory;
