/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const CollectionSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'cannot be empty'],
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
}, { timestamps: true });

const autoPopulateProducts = function (next) {
  this.populate({
    path: 'products',
  });
  next();
};

CollectionSchema.pre('findOne', autoPopulateProducts);

const Collection = model('Collection', CollectionSchema);

export default Collection;
