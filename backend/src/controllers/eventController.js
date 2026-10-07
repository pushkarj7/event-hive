import { Event } from "../models/Event.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

// @desc    Get all events (with optional filtering by category/search)
// @route   GET /api/events
export const getEvents = async (req, res) => {
  try {
    const { category, search, city } = req.query;
    const filter = {};

    if (category) {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    if (city) {
      filter["location.city"] = new RegExp(city, "i");
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const events = await Event.find(filter).sort({ date: 1 });
    return successResponse(res, "Events fetched successfully", events);
  } catch (error) {
    return errorResponse(res, "Failed to fetch events", 500, error);
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer", "name email");
    if (!event) {
      return errorResponse(res, "Event not found", 404);
    }
    return successResponse(res, "Event details fetched", event);
  } catch (error) {
    return errorResponse(res, "Failed to fetch event", 500, error);
  }
};

// @desc    Create a new event
// @route   POST /api/events
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      time,
      location,
      price,
      capacity,
      image,
      organizer,
      tags,
    } = req.body;

    if (!title || !description || !category || !date || !time || !location || capacity === undefined) {
      return errorResponse(res, "Missing required event fields", 400);
    }

    const newEvent = await Event.create({
      title,
      description,
      category,
      date,
      time,
      location,
      price: price || 0,
      capacity,
      image: image || "",
      organizer,
      tags: tags || [],
    });

    return successResponse(res, "Event created successfully", newEvent, 201);
  } catch (error) {
    return errorResponse(res, "Failed to create event", 500, error);
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return errorResponse(res, "Event not found", 404);
    }

    return successResponse(res, "Event updated successfully", updated);
  } catch (error) {
    return errorResponse(res, "Failed to update event", 500, error);
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
export const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return errorResponse(res, "Event not found", 404);
    }
    return successResponse(res, "Event deleted successfully");
  } catch (error) {
    return errorResponse(res, "Failed to delete event", 500, error);
  }
};
