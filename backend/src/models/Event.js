import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    location: {
      venue: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, default: "" },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
      default: 0,
    },
    capacity: {
      type: Number,
      required: [true, "Total capacity is required"],
      min: 1,
    },
    ticketsSold: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      default: "",
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model("Event", eventSchema);
