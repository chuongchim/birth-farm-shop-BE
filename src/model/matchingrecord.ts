import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface MatchingRecordDocument extends Document {
  bird1ID: Types.ObjectId;
  bird2ID: Types.ObjectId;
  customerMessage: string;
  statusCode: string;
  phase: string;
  pending: string;
  matching: string;
  success: string;
  raising: string;
  denied: string;
}

const matchingRecordSchema: Schema = new mongoose.Schema({
  bird1ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bird',
    required: true,
  },
  bird2ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bird',
    required: true,
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Assuming you have a Customer model
    required: true,
  },
  customerMessage: {
    type: String,
    required: true,
  },
  phase: {
    type: String,
    enum: ['pending', 'matching', 'denied', 'success', 'raising'], // Add more phases as needed
    default: 'pending',
  },
  pending: {
    type: String,
    default: '',
  },
  matching: {
    type: String,
    default: '',
  },
  success: {
    type: String,
    default: '',
  },
  raising: {
    type: String,
    default: '',
  },


});

const MatchingRecord: Model<MatchingRecordDocument> = mongoose.model<MatchingRecordDocument>(
  'MatchingRecord',
  matchingRecordSchema
);

export default MatchingRecord;
