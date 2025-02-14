import mongoose, { Document, Schema } from 'mongoose';

export interface IChatModel extends Document {
  _id: mongoose.Types.ObjectId;
  user: {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
  };
  last_thread: {
    id: string;
    status: string;
  }
  total_messages: number;
  title: string;
  active_bot: boolean;
  created_at: Date;
  updated_at: Date;
}

export const ChatSchema = new Schema<IChatModel>({
  user: {
    id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: false },
    email: { type: String, required: true },
  },
  last_thread: {
    id: { type: String, required: false },
    status: { type: String, required: false },
  },
  total_messages: { type: Number, required: true, default: 0 },
  title: { type: String, required: true },
  active_bot: { type: Boolean, required: true, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

ChatSchema.pre('save', function (next) {
  this.created_at = new Date();
  this.updated_at = new Date();
  next();
});

ChatSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updated_at: new Date() });
  next();
});

export const IChat = mongoose.model<IChatModel>('chats', ChatSchema);
