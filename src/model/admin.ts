import mongoose, { Document, Model } from 'mongoose';

interface AdminDocument extends Document {
  adminID: string;
}

const adminSchema = new mongoose.Schema({
  adminID: {
    type: String,
    required: true
  }
});

const Admin: Model<AdminDocument> = mongoose.model<AdminDocument>('Admin', adminSchema);

export default Admin;
