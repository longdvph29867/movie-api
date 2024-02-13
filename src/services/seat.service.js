import Seat from "../models/Seat.model.js";

const querySeats = async (filter, options) => {
  const users = await Seat.filter();
  return users;
};

const seatService = {
  querySeats,
};

export default seatService;
