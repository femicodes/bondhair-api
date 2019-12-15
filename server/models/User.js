import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'cannot be empty'],
  },
  type: {
    type: String,
  },
}, { timestamps: true });

const User = model('User', UserSchema);

export default User;
