import mongoose from "mongoose";
import toJSON from "./plugins/toJSON.plugin.js";

const bookingSchema = new mongoose.Schema(
  {
    showing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showings",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    seats: [
      {
        seatId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    bookingTime: {
      type: Date,
      default: Date.now,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Bookings",
    versionKey: false,
  }
);

bookingSchema.plugin(toJSON);

const Booking = mongoose.model("Bookings", bookingSchema);

export default Booking;
