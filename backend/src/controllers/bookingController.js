import { createBookingService, getUserBookingsService, cancelBookingService } from "../services/bookingService.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { generateTicketPDF } from "../utils/generateTicket.js";

// @desc    Create new booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { userId, eventId, numberOfTickets } = req.body;

    if (!userId || !eventId || !numberOfTickets) {
      return errorResponse(res, "User ID, Event ID and tickets count are required", 400);
    }

    const booking = await createBookingService({ userId, eventId, numberOfTickets });
    return successResponse(res, "Booking confirmed successfully", booking, 201);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to create booking", 500, error);
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user/:userId
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await getUserBookingsService(req.params.userId);
    return successResponse(res, "User bookings fetched", bookings);
  } catch (error) {
    return errorResponse(res, "Failed to fetch bookings", 500, error);
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
export const cancelBooking = async (req, res) => {
  try {
    const booking = await cancelBookingService(req.params.id);
    return successResponse(res, "Booking cancelled successfully", booking);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to cancel booking", 500, error);
  }
};

// @desc    Get ticket for booking
// @route   GET /api/bookings/:id/ticket
export const getTicket = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("event");
    if (!booking) {
      return errorResponse(res, "Booking not found", 404);
    }
    const ticket = await generateTicketPDF({
      _id: booking._id,
      bookingId: booking._id,
      eventId: booking.event.title,
      numberOfTickets: booking.numberOfTickets,
      totalAmount: booking.totalAmount,
      status: booking.status,
      createdAt: booking.createdAt,
    });
    res.contentType("application/pdf");
    res.send(ticket);
  } catch (error) {
    return errorResponse(res, "Failed to generate ticket", 500, error);
  }
};
