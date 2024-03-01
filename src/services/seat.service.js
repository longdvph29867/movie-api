import Seat from "../models/Seat.model.js";

const querySeats = async (filter, options) => {
  const users = await Seat.find().sort({ seatNumber: "asc" });
  return users;
};

const seatService = {
  querySeats,
};

export default seatService;
