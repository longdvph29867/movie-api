import mongoose from "mongoose";
import { filter } from "./plugins/filter.plugin.js";

const seatSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: Number,
      maxLength: 25,
    },
    seatVip: {
      type: Boolean,
    },
  },
  {
    collection: "Seats",
    versionKey: false,
    timestamps: true,
  }
);

seatSchema.plugin(filter);

const Seat = mongoose.model("Seats", seatSchema);

export default Seat;
