import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IChatModel } from '../schema/chat.schema';
import { BaseService } from 'src/common/services/base.service';
import { IMessageModel } from '../../messages/schema/message.schema';

@Injectable()
export class ChatsService extends BaseService<IChatModel> {
  constructor(
    @InjectModel('chats') private readonly chatModel: Model<IChatModel>,
    @InjectModel('messages')
    private readonly messageModel: Model<IMessageModel>,
  ) {
    super(chatModel);
  }
  async getById(chatId: string): Promise<IChatModel | null> {
    return this.chatModel.findById(chatId).exec();
  }
  
  async getByNumber(number: number): Promise<IChatModel | null> {
    return this.chatModel.findOne({ 'user.phone': number }).exec();
  }

  async getByUserIdandState(
    id: string,
    state: string,
  ): Promise<IChatModel | null> {
    return this.chatModel.findOne({ userId: id, state }).exec();
  }

  async updateState(id: string, state: string): Promise<IChatModel | null> {
    return this.chatModel
      .findByIdAndUpdate(id, { state }, { new: true })
      .exec();
  }

  async updateThread(id: string, state: string): Promise<IChatModel | null> {
    return this.chatModel
      .findByIdAndUpdate(
        id,
        { $set: { 'last_thread.status': state } },
        { new: true },
      )
      .exec();
  }

  async pushMessage(
    id: any,
    // messageId: mongoose.Types.ObjectId,
    lastMessage: any,
  ): Promise<IChatModel | null> {
    return this.chatModel
      .findByIdAndUpdate(
        id,
        // { $push: { messages: messageId }, $set: { last_message: lastMessage } },
        { $set: { last_message: lastMessage } },
        { new: true },
      )
      .exec();
  }

  async findOneByUser(userId: string) {
    return this.chatModel.findOne({ 'user.id': userId }).exec();
  }

  async updateLastMessage(
    messageId: any,
    lastMessageUpdate: any,
  ): Promise<IChatModel | null> {
    const updateFields: any = {};
    if (lastMessageUpdate.outbound_sent_at) {
      updateFields['last_message.outbound_sent_at'] =
        lastMessageUpdate.outbound_sent_at;
    }
    if (lastMessageUpdate.outbound_delivered_at) {
      updateFields['last_message.outbound_delivered_at'] =
        lastMessageUpdate.outbound_delivered_at;
    }
    if (lastMessageUpdate.outbound_read_at) {
      updateFields['last_message.outbound_read_at'] =
        lastMessageUpdate.outbound_read_at;
    }
    return this.chatModel
      .findOneAndUpdate(
        { 'last_message.message_id': messageId },
        { $set: updateFields },
        { new: true },
      )
      .exec();
  }

  async findByPhone(phone: string) {
    return this.chatModel.findOne({ 'user.phone': phone }).exec();
  }

  async updateTotalMessages(chatId: string): Promise<IChatModel | null> {
    try {
      const totalMessages = await this.messageModel.countDocuments({
        chat_id: chatId,
      });
      return this.chatModel
        .findByIdAndUpdate(
          chatId,
          { $set: { total_messages: totalMessages } },
          { new: true },
        )
        .exec();
    } catch (error) {
      console.error('Error updating total messages:', error);
      throw error;
    }
  }
}
