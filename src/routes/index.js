import { Router } from "express";
import routerMovies from "./movie.route.js";
import routerGenre from "./genre.route.js";
import routerUser from "./user.route.js";
import routerAuth from "./auth.route.js";
import routerImages from "./image.route.js";
import routerActor from "./actor.route.js";
import routerCountries from "./country.route.js";
import routerCinemaChain from "./cinemaChain.route.js";
import routerCinemaBranch from "./cinemaBranch.route.js";
import routerShowing from "./showing.route.js";

const routes = Router();
routes.use("/movies", routerMovies);
routes.use("/genres", routerGenre);
routes.use("/users", routerUser);
routes.use("/auth", routerAuth);
routes.use("/images", routerImages);
routes.use("/actors", routerActor);
routes.use("/countries", routerCountries);
routes.use("/cinemachains", routerCinemaChain);
routes.use("/cinemabranchs", routerCinemaBranch);
routes.use("/showings", routerShowing);

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
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         poster:
 *           type: string
 *         director:
 *           type: string
 *         cast:
 *           type: string
 *         genre:
 *           type: [string]
 *         runingTime:
 *           type: number
 *         language:
 *           type: string
 *         trailer:
 *           type: string
 *         imgBanner:
 *           type: string
 *       example:
 *         id: 5ebac534954b54139806c112
 *         name: movie name
 *         poster: url
 *         director: director
 *         cast: cast
 *         genre: [5ebac534954b54139806c112]
 *         runingTime: 100
 *         language: English
 *         trailer: url
 *         imgBanner: url
 *
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         genreName:
 *           type: string
 *         genreSlug:
 *           type: string
 *       example:
 *         id: 5ebac534954b54139806c112
 *         genreName: New genre
 *         genreSlug: new-genre
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */
