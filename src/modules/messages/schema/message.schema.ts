import mongoose, { Document, Schema } from 'mongoose';

export interface IMessageContent {
  type: string; // Type of content: "text", "media"
  text?: string; // Optional text content if applicable
  media?: {
    id?: string; // Agregar soporte para buffer
    mimeType?: string; // Tipo MIME del archivo
    fileName?: string; // Opcional, nombre del archivo
    url?: string; // En caso de que se use una URL en lugar del buffer
    type: string; // Media type: "image", "document", "audio", etc.
    caption?: string; // Opcional, descripción de la imagen
  };
}

export interface IMessageModel extends Document {
  _id: mongoose.Types.ObjectId; // Unique identifier for each message
  user_id: mongoose.Types.ObjectId; // Reference to the user in the Users collection
  chat_id: mongoose.Types.ObjectId; // Reference to the chat in the Chats collection
  status: string; // Status of the message: "delivered", "sent", "read"
  direction: string; // Message direction: "inbound" or "outbound"
  channel: string; // Channel: "whatsapp" or "chat-interno"
  outbound_sent_at?: Date; // Optional timestamp of when the message was sent
  outbound_delivered_at?: Date; // Optional timestamp of when the message was delivered
  outbound_read_at?: Date; // Optional timestamp of when the message was read
  count_unread_messages?: number; // Optional count of unread messages
  inbound_message_date?: Date; // Optional timestamp of the inbound message
  content: IMessageContent; // Content of the message
  inbound_sender: {
    full_name: string; // Full name of the sender
    number: string; // Phone number of the sender
  };
  outbound_sender: {
    assistant?: string; // Assistant name for outbound messages
    full_name: string; // Full name of the sender
  };
  created_at: Date;
}

export const MessageSchema = new Schema<IMessageModel>({
  user_id: { type: Schema.Types.ObjectId, ref: 'users' }, // User ID reference, required
  chat_id: { type: Schema.Types.ObjectId, ref: 'chats' }, // Chat ID reference, required
  status: { type: String, required: false }, // Status of the message, optional
  direction: { type: String, required: true }, // Direction of the message, required
  channel: { type: String, required: true }, // Channel of the message, required
  outbound_sent_at: { type: Date, required: false },
  outbound_delivered_at: { type: Date, required: false },
  outbound_read_at: { type: Date, required: false },
  count_unread_messages: { type: Number, required: false },
  inbound_message_date: { type: Date, required: false },
  content: {
    type: {
      type: String, // Type of content: "text", "media"
      required: true, // Required field
    },
    text: { type: String, required: false }, // Optional text content
    media: {
      id: { type: String, required: false }, // Agregar soporte para buffer
      mimeType: { type: String, required: false }, // URL for media content
      fileName: { type: String, required: false }, // URL for media content
      url: { type: String, required: false }, // URL for media content
      type: { type: String, required: false }, // Media type: "image", "document", "audio", etc.
      caption: { type: String, required: false }, // Optional caption for media content
    },
  },
  inbound_sender: {
    full_name: { type: String, required: false }, // Full name of the sender, optional
    number: { type: String, required: false }, // Phone number of the sender, optional
  },
  outbound_sender: {
    full_name: { type: String, required: false }, // Full name of the sender, optional
  },
  created_at: { type: Date, default: Date.now },
});

MessageSchema.pre('save', function (next) {
  this.created_at = new Date();
  next();
});

export const Message = mongoose.model<IMessageModel>('messages', MessageSchema);
