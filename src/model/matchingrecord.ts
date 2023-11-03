
import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface MatchingRecordDocument extends Document {
  bird1ID: Types.ObjectId;
  bird2ID: Types.ObjectId;
  customerID: Types.ObjectId;
  customerMessage: string;
  phase: string;
  pending: string;
  denied: string;
  matching: string;
  success: string;
  raising: string;
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
  
  phase: {
    type: String,
    enum: ['pending', 'matching', 'denied', 'success', 'raising', 'canceled'], // Add more phases as needed
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
  denied: {
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