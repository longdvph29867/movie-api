import userService from "../services/user.service.js";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import bookingService from "../services/booking.service.js";
class BookingsCotroller {
  async getAll(req, res) {
    try {
      const filter = pickOption(req.query, ["name", "role"]);
      const options = pickOption(req.query, ["sortBy", "limit", "page"]);
      const result = await userService.queryUsers(filter, options);
      res.send(result);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async create(req, res) {
    try {
      const data = { ...req.body };
      const existingBooking = await bookingService.getBookingByUserShowing(
        data.showing,
        data.user
      );
      if (existingBooking) {
        const booking = await bookingService.updateSeatBookingById(
          existingBooking._id,
          data.seats
        );
        return res.status(httpStatus.CREATED).send(booking);
      }
      const booking = await bookingService.createBooking(req.body);
      res.status(httpStatus.CREATED).send(booking);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async delete(req, res) {
    try {
      await bookingService.deleteBookingById(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      errorMessage(res, err);
    }
  }
}

export default new BookingsCotroller();
