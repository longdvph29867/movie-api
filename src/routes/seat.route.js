import { Router } from "express";
import validate from "../middlewares/validate.js";
import seatController from "../controllers/seat.controller.js";
import { getSeats } from "../validations/seat.validation.js";

const routerSeat = Router();
routerSeat.get("/", validate(getSeats), seatController.getAll);
export default routerSeat;

/**
 * @swagger
 * tags:
 *   name: Seats
 *   description: API operations related to seat
 */

/**
 * @swagger
 * /seats:
 *   get:
 *     summary: Get all seats by showing
 *     description: get all seats.
 *     tags: [Seats]
 *     parameters:
 *       - in: query
 *         name: showing
 *         schema:
 *           type: string
 *         description: id showing
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */
