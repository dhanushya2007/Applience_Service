const express = require("express");
const cors = require("cors");

const app = express();

// ROUTES
const authRoutes = require("./Routes/authRoutes");
const bookingRouter = require("./Routes/BookingRoutes");

// MIDDLEWARES
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTimeOfHit = new Date().toLocaleString();
  next();
});

// ROUTE MOUNTING
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRouter);

module.exports = app;
