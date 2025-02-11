import mongoose, { Document, Schema } from 'mongoose';

export interface IChatModel extends Document {
  _id: mongoose.Types.ObjectId;
  user: {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
  };
  total_messages: number;
  last_message: {
    message_id: mongoose.Types.ObjectId;
    content_type: string;
    content_preview: string;
    direction: string;
    outbound_sent_at?: Date;
    outbound_delivered_at?: Date;
    outbound_read_at?: Date;
    count_unread_messages?: number;
    inbound_message_date?: Date;
  };
  active_bot: boolean;
  assigned_bot: {
    id: string;
    name: string;
    status: string;
  };
  created_at: Date;
  updated_at: Date;
}

export const ChatSchema = new Schema<IChatModel>({
  user: {
    id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: false },
    email: { type: String, required: true },
  },
  total_messages: { type: Number, required: true, default: 0 },
  last_message: {
    message_id: { type: Schema.Types.ObjectId, required: false },
    content_type: { type: String, required: false },
    content_preview: { type: String, required: false },
    direction: { type: String, required: false },
    outbound_sent_at: { type: Date, required: false },
    outbound_delivered_at: { type: Date, required: false },
    outbound_read_at: { type: Date, required: false },
    count_unread_messages: { type: Number, required: false },
    inbound_message_date: { type: Date, required: false },
  },
  active_bot: { type: Boolean, required: true, default: false },
  assigned_bot: {
    id: { type: String, required: false },
    name: { type: String, required: false },
  },
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
