import { Router } from "express";
import routerMovies from "./movies.js";
import routerCategory from "./categories.js";
import routerUser from "./users.js";
import routerAuth from "./auth.js";
import routerImages from "./images.js";

const routes = Router();
routes.use("/movies", routerMovies);
routes.use("/categories", routerCategory);
routes.use("/users", routerUser);
routes.use("/auth", routerAuth);
routes.use("/images", routerImages);

export default routes;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         account:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         fullName:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *       example:
 *         id: 5ebac534954b54139806c112
 *         email: fake@gmail.com
 *         name: fake name
 *         role: user
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */
