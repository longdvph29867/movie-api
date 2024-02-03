/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API operations related to auth
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: string
 *               password: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account
 *               - email
 *               - fullName
 *               - password
 *             properties:
 *               account:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               fullName:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: string
 *               password: string
 *           example:
 *             account: String
 *             email: String
 *             fullName: String
 *             password: String
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

import { Router } from "express";
import authController from "../controllers/authController.js";

const routerAuth = Router();
routerAuth.post("/register", authController.signUp);
routerAuth.post("/login", authController.signIn);
export default routerAuth;
