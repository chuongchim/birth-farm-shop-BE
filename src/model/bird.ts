import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { boolean } from "webidl-conversions";

export interface BirdDocument extends Document {
  // BirdID: string;
  birdName: string;
  age: number;
  typeID: Types.ObjectId;
  gender: boolean;
  status: boolean;
  fertility: boolean;
  healthCareID: Types.ObjectId;
  price: number;
  description: string;
  images: string[];
}

const birdSchema: Schema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
  },
  typeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypeOfBird",
  },

  gender: {
    type: Boolean,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  fertility: {
    type: Boolean,
    required: true,
  },
  healthCareID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthCareProffessional",
  },
  birdName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

const Bird: Model<BirdDocument> = mongoose.model<BirdDocument>(
  "Bird",
  birdSchema
);

export default Bird;
