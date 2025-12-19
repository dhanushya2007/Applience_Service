// Controllers/BookingController.js
const Booking = require("../Models/BookingModel");

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      status: "Successful",
      length: bookings.length,
      data: { bookings },
    });
  } catch (err) {
    res.status(404).json({ status: "Fail", msg: err });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json({
      status: "Successful",
      data: { booking },
    });
  } catch (err) {
    res.status(404).json({ status: "Fail", msg: err });
  }
};

// Create booking with duplicate check
exports.createBooking = async (req, res) => {
  try {
    const { customerName, email, applianceName, date } = req.body;

    // Check if booking already exists for same customer + appliance + date
    const existing = await Booking.findOne({ customerName, email, applianceName, date });

    if (existing) {
      return res.status(409).json({
        status: "Duplicate",
        message: "Booking already exists for this appliance on the selected date",
      });
    }

    const newBooking = await Booking.create(req.body);
    res.status(201).json({
      status: "Success",
      message: "Booking saved successfully",
      data: { booking: newBooking },
    });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: err.message });
  }
};


// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "True",
      data: { booking: updatedBooking },
    });
  } catch (err) {
    res.status(400).json({ status: "Failed to Write", err });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Deleted",
      booking: null,
    });
  } catch (err) {
    res.status(400).json({ status: "Failed to Write", err });
  }
};
