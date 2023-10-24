import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface BirdDocument extends Document {
  // BirdID: string;
  age: number;
  typeID: Types.ObjectId[];
  gender: boolean;
  status: string;
  fertility: string;
  healthCareID: Types.ObjectId[];
}

const birdSchema: Schema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
  },
  typeID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TypeOfBird',
    },
  ],
  gender: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  fertility: {
    type: String,
    required: true,
  },
  healthCareID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthCareProffessional',
    },
  ],
});

const Bird: Model<BirdDocument> = mongoose.model<BirdDocument>('Bird', birdSchema);

export default Bird;
