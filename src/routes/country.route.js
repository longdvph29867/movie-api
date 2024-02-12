import { Router } from "express";
import countryController from "../controllers/country.controller.js";

const routerCountries = Router();
routerCountries.get("/", countryController.getAll);

export default routerCountries;

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: API operations related to country
 */

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries]
 *     responses:
 *       '200':
 *         description: The list of the countries
 *         content:
 *           application/json:
 *             example: {}
 */
