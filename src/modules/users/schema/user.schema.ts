import mongoose, { Schema, Document } from 'mongoose';

// Define the IUserModel interface
export interface IUserModel extends Document {
  _id: mongoose.Types.ObjectId;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone: string;
  phoneName: string;
  personal_id?: {
    type: string;
    number: string;
  };
  address?: {
    portal_id?: number;
    line?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country_id?: string;
  };
  created_at?: Date;
  updated_at?: Date;
  status: string;
  notes?: string;
  chat: mongoose.Types.ObjectId;
}

// Create the UserSchema
export const UserSchema: Schema = new Schema({
  email: { type: String, required: false, trim: true },
  first_name: { type: String, required: false, trim: true },
  last_name: { type: String, required: false, trim: true },
  phone: { type: String, required: true, trim: true },
  phoneName: { type: String, required: true, trim: true },
  personal_id: {
    type: { type: String, required: false, trim: true },
    number: { type: String, required: false, trim: true },
  },
  address: {
    portal_id: { type: Number, required: false, trim: true },
    line: { type: String, required: false, trim: true },
    city: { type: String, required: false, trim: true },
    state: { type: String, required: false, trim: true },
    zip_code: { type: String, required: false, trim: true },
    country_id: { type: String, required: false, trim: true },
  },
  created_at: { type: Date, required: false, trim: true },
  updated_at: { type: Date, required: false, trim: true },
  status: { type: String, required: true, trim: true },
  notes: { type: String, required: false, trim: true },
  chat: [{ type: Schema.Types.ObjectId, ref: 'chats' }],
});

UserSchema.pre('save', function (next) {
  this.created_at = new Date();
  this.updated_at = new Date();
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updated_at: new Date() });
  next();
});

// Export the User model
export const User = mongoose.model<IUserModel>('users', UserSchema);
