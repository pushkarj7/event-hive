import { Booking } from "../models/Booking.js";
import { Event } from "../models/Event.js";

/**
 * Creates a new booking and updates event ticket count
 * @param {Object} bookingData - Details of the booking
 * @returns {Promise<Object>} Created booking
 */
export const createBookingService = async ({ userId, eventId, numberOfTickets }) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error("Event not found");
  }

  if (event.ticketsSold + Number(numberOfTickets) > event.capacity) {
    throw new Error("Not enough tickets available");
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

  return booking;
};

/**
 * Retrieves all bookings for a user
 * @param {string} userId - ID of the user
 * @returns {Promise<Array>} Array of bookings
 */
export const getUserBookingsService = async (userId) => {
  return await Booking.find({ user: userId })
    .populate("event")
    .sort({ createdAt: -1 });
};

/**
 * Cancels a booking and restores event ticket availability
 * @param {string} bookingId - ID of the booking to cancel
 * @returns {Promise<Object>} Updated booking
 */
export const cancelBookingService = async (bookingId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status === "cancelled") {
    throw new Error("Booking is already cancelled");
  }

  booking.status = "cancelled";
  await booking.save();

  // Revert tickets count on event
  const event = await Event.findById(booking.event);
  if (event) {
    event.ticketsSold = Math.max(0, event.ticketsSold - booking.numberOfTickets);
    await event.save();
  }

  return booking;
};

export default {
  createBookingService,
  getUserBookingsService,
  cancelBookingService,
};