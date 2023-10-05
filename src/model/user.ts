import mongoose, { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  // userID: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  Gender: boolean;
  address: string;
  dateOfBirth: Date;
}

const userSchema = new mongoose.Schema({
  // userID: {
  //   type: String,
  //   required: true
  // },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Gender: {
    type: Boolean,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  }
});

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default User;
