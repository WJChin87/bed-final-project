import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    const filters = {
      userId: req.query.userId,
      propertyId: req.query.propertyId,
    };

    const bookings = await getBookings(filters);
    res.status(200).json(bookings);
  },
  notFoundErrorHandler
);

router.post(
  "/",
  auth,
  async (req, res, next) => {
    const requiredFields = [
      "userId",
      "propertyId",
      "checkinDate",
      "checkoutDate",
      "numberOfGuests",
      "totalPrice",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    res.status(201).json({
      message: "Booking successfully created!",
      booking: newBooking,
    });
  },
  notFoundErrorHandler
);

router.get("/:id", async (req, res, next) => {
  console.log("req.params:", req.params);
  const { id } = req.params;
  const booking = await getBookingById(id);

  if (booking) {
    res.status(200).json(booking);
  } else {
    res.status(404).json({ message: `Booking not found` });
  }
  notFoundErrorHandler;
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  const deletedBooking = await deleteBookingById(id);

  if (deletedBooking) {
    res.status(200).json({ message: `Booking with id ${id} deleted` });
  } else {
    res.status(404).json({ message: `Booking with id ${id} not found` });
  }
  notFoundErrorHandler;
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const updatedBookingData = req.body;
  const updatedBookingById = await updateBookingById(id, updatedBookingData);

  if (updatedBookingById) {
    res.status(200).json({
      message: `Booking with id ${id} successfully updated`,
      updatedBookingById,
    });
  } else {
    return res.status(404).json({
      message: `Booking with id ${id} not found`,
    });
  }

  notFoundErrorHandler;
});

export default router;
