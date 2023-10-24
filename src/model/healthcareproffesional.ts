import mongoose, { Document, Model } from 'mongoose';

export interface HealthCareProffessionalDocument extends Document {
  healthCareID: string;
}

const healthCareProffessionalSchema = new mongoose.Schema({
  healthCareID: {
    type: String,
    required: true
  }
});

const HealthCareProffessional: Model<HealthCareProffessionalDocument> = mongoose.model<HealthCareProffessionalDocument>('HealthCareProffessional', healthCareProffessionalSchema);

export default HealthCareProffessional;
