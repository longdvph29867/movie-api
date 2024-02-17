import userService from "../services/user.service.js";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import seatService from "../services/seat.service.js";
import bookingService from "../services/booking.service.js";
import { mapBookedSeat, mapPriceSeat } from "../utils/mapShowingMovie.js";
import showingService from "../services/showing.service.js";
class SeatsCotroller {
  async getAll(req, res) {
    try {
      const idShowing = req.query.showing;
      const showing = await showingService.getShowingById(idShowing);
      if (!showing) {
        throw new ApiError(httpStatus.NOT_FOUND, "Showing not found");
      }
      const seats = await seatService.querySeats({}, {});
      const bookedTickets = await bookingService.getBookingByShowing(idShowing);
      const bookedSeats = mapBookedSeat(bookedTickets);
      const data = {
        idShowing,
        seatList: mapPriceSeat(
          seats,
          bookedSeats,
          showing.vipPrice,
          showing.normalPrice
        ),
      };
      res.send(data);
    } catch (err) {
      errorMessage(res, err);
    }
  }
}

export default new SeatsCotroller();
