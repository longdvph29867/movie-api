import { Router } from "express";
import usersController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import bookingController from "../controllers/booking.controller.js";
import {
  createBooking,
  deleteBooking,
  getBookingByUser,
} from "../validations/booking.validation.js";

const routerBooking = Router();
routerBooking.get("/", validate(getBookingByUser), bookingController.getAll);
routerBooking.post("/", validate(createBooking), bookingController.create);
routerBooking.delete("/:id", validate(deleteBooking), bookingController.delete);
export default routerBooking;

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: API operations related to user
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all booking tickets by user
 *     description: Get all booking tickets by user.
 *     tags: [Booking]
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: id user
 *     responses:
 *       '200':
 *         description: The list of the booking
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - showing
 *               - user
 *               - seats
 *               - totalPrice
 *             properties:
 *               showing:
 *                 type: string
 *                 format: showing
 *               user:
 *                 type: string
 *                 format: user
 *               seats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     seatId:
 *                       type: string
 *                     seatNumber:
 *                       type: number
 *                     price:
 *                       type: number
 *               totalPrice:
 *                 type: number
 *           example:
 *             showing: "idShowing"
 *             user: "idUser"
 *             seats: [{"seatId": "idSeat","seatNumber": 0 , "price": 0}]
 *             totalPrice: 0
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a users
 *     tags: [Booking]
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
