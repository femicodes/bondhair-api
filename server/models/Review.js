import { Schema, model } from 'mongoose';

const ReviewSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'cannot be empty'],
  },
  body: {
    type: String,
    required: [true, 'cannot be empty'],
  },
}, { timestamps: true });

const Review = model('Review', ReviewSchema);

export default Review;
