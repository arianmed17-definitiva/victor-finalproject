import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    required: true
  },
  user: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export const Review = mongoose.model("Review", reviewSchema);
