import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IMessageModel } from '../schema/message.schema';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class MessagesService extends BaseService<IMessageModel> {
  constructor(
    @InjectModel('messages')
    private readonly messageModel: Model<IMessageModel>,
  ) {
    super(messageModel);
  }

  async updateSpecificFields(id: string, updateData: Partial<IMessageModel>) {
    return this.messageModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .exec();
  }

  async findMessagesByCursor(limit: number, cursor?: string, chatId?: string) {
    const query: any = cursor
      ? { _id: { $gt: new Types.ObjectId(cursor) } }
      : {};
    if (chatId) {
      query.chat_id = new Types.ObjectId(chatId);
    }
    return this.messageModel
      .find(query)
      .sort({ created_at: -1 })
      .limit(limit)
      .exec();
  }
}
