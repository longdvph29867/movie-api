import userService from "../services/user.service.js";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import bookingService from "../services/booking.service.js";
import showingService from "../services/showing.service.js";
class BookingsCotroller {
  async getAll(req, res) {
    try {
      const idUser = req.query.user;
      const listTicket = await bookingService.getBookingByUser(idUser);
      const data = listTicket.map((item) => {
        const cinemaBranch = {
          cinemaBranchName: item.showing.cinemaBranch.cinemaBranchName,
          cinemaBranchCode: item.showing.cinemaBranch.cinemaBranchCode,
          slug: item.showing.cinemaBranch.slug,
          location: item.showing.cinemaBranch.location,
        };
        const movie = {
          idMovie: item.showing.movie.id,
          name: item.showing.movie.name,
          poster: item.showing.movie.poster,
          director: item.showing.movie.director,
          imgBanner: item.showing.movie.imgBanner,
        };
        const seats = item.seats.map((seat) => {
          return {
            seatNumber: seat.seatNumber,
            price: seat.price,
          };
        });
        return {
          idBooking: item._id,
          cinemaBranch,
          movie,
          seats,
          showTime: item.showing.showTime,
          user: item.user,
          bookingTime: item.bookingTime,
        };
      });
      res.send(data);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async create(req, res) {
    try {
      const data = { ...req.body };
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
