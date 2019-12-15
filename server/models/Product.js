import { Schema, model } from 'mongoose';

const ProductSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'cannot be empty'],
  },
  hairPhoto: {
    type: String,
    required: [true, 'cannot be empty'],
  },
  description: {
    type: String,
    required: [true, 'cannot be empty'],
  },
  brand: {
    type: String,
    required: [true, 'cannot be empty'],
  },
  price: {
    type: Number,
    required: [true, 'cannot be empty'],
  },
  likes: {
    type: Number,
    default: 0
  },
  /*  reviews: [{
     type: Schema.Types.ObjectId,
     ref: 'Review',
   }], */
}, { timestamps: true });

const autoPopulateReviews = function (next) {
  this.populate({
    path: 'reviews',
  });
  next();
};

ProductSchema.pre('findOne', autoPopulateReviews);

const Product = model('Product', ProductSchema);

export default Product;
