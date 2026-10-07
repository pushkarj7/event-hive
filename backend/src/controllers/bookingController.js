import { Booking } from "../models/Booking.js";
import { Event } from "../models/Event.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

// @desc    Create new booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { userId, eventId, numberOfTickets } = req.body;

    if (!userId || !eventId || !numberOfTickets) {
      return errorResponse(res, "User ID, Event ID and tickets count are required", 400);
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return errorResponse(res, "Event not found", 404);
    }

    if (event.ticketsSold + Number(numberOfTickets) > event.capacity) {
      return errorResponse(res, "Not enough tickets available", 400);
    }

    const totalAmount = event.price * Number(numberOfTickets);

    const booking = await Booking.create({
      user: userId,
      event: eventId,
      numberOfTickets: Number(numberOfTickets),
      totalAmount,
      status: "confirmed",
      paymentStatus: "paid",
    });

    // Update tickets sold on event
    event.ticketsSold += Number(numberOfTickets);
    await event.save();

    return successResponse(res, "Booking confirmed successfully", booking, 201);
  } catch (error) {
    return errorResponse(res, "Failed to create booking", 500, error);
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user/:userId
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("event")
      .sort({ createdAt: -1 });

    return successResponse(res, "User bookings fetched", bookings);
  } catch (error) {
    return errorResponse(res, "Failed to fetch bookings", 500, error);
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return errorResponse(res, "Booking not found", 404);
    }

    if (booking.status === "cancelled") {
      return errorResponse(res, "Booking is already cancelled", 400);
    }

    booking.status = "cancelled";
    await booking.save();

    // Revert tickets count on event
    const event = await Event.findById(booking.event);
    if (event) {
      event.ticketsSold = Math.max(0, event.ticketsSold - booking.numberOfTickets);
      await event.save();
    }

    return successResponse(res, "Booking cancelled successfully", booking);
  } catch (error) {
    return errorResponse(res, "Failed to cancel booking", 500, error);
  }
};
