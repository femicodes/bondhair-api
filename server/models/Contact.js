import { Schema, model } from 'mongoose';

const ContactSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'cannot be empty'],
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: Number,
  },
  comment: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

const Contact = model('Contact', ContactSchema);

export default Contact;
