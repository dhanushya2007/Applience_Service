// Routes/BookingRoutes.js
const express = require("express");
const controller = require("../Controllers/BookingController"); // <-- must point to correct file
const bookingRouter = express.Router();

bookingRouter
  .route("/")
  .get(controller.getAllBookings)   // must be a function
  .post(controller.createBooking);

bookingRouter
  .route("/:id")
  .get(controller.getBookingById)
  .put(controller.updateBooking)
  .delete(controller.deleteBooking);

module.exports = bookingRouter;
