import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const bookings = await getBookings();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
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
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
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

    if (!newBooking) {
      throw new Error(
        "Failed to create booking. Please check the request data."
      );
    }

    res.status(201).json({
      message: `Booking with id ${newBooking.id} successfully added`,
      booking: newBooking,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res, next) => {
  console.log("req.params:", req.params);
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      res.status(404).json({ message: `Booking with id ${id} not found` });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  console.log("req.params:", req.params);
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      res.status(404).json({ message: `Booking with id ${id} not found` });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBooking = await deleteBookingById(id);
    if (!deletedBooking) {
      res.status(404).json({ message: `Booking with id ${id} not found` });
    } else {
      res.status(200).json({ message: `Booking with id ${id} deleted` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res) => {
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
});

export default router;
