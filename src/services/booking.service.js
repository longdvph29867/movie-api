import httpStatus from "http-status";
import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import Booking from "../models/Booking.model.js";

const createBooking = async (data) => {
  return await Booking.create(data);
};

const queryBookings = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getBookingByUserShowing = async (showing, user) => {
  return Booking.findOne({ showing, user });
};

const getBookingById = async (id) => {
  return Booking.findById(id);
};

const getBookingByShowing = async (showing) => {
  return Booking.find({ showing });
};

const updateSeatBookingById = async (idBooking, seatsToAdd) => {
  const updatedBooking = await Booking.findOneAndUpdate(
    { _id: idBooking },
    { $push: { seats: { $each: seatsToAdd } } },
    { new: true }
  );
  return updatedBooking;
};

const deleteBookingById = async (id) => {
  const booking = await getBookingById(id);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, "Booking not found");
  }
  await Booking.findByIdAndDelete(booking.id);
  return Booking;
};

const bookingService = {
  createBooking,
  queryBookings,
  getBookingByUserShowing,
  getBookingByShowing,
  getBookingById,
  updateSeatBookingById,
  deleteBookingById,
};

export default bookingService;
