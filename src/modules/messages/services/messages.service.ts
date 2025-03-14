import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IMessageModel } from '../schema/message.schema';
import { BaseService } from 'src/common/services/base.service';
import { GptService } from 'src/modules/gpt/services/gpt.service';
import { ChatsService } from 'src/modules/chats/services/chats.service';

@Injectable()
export class MessagesService extends BaseService<IMessageModel> {
  constructor(
    @InjectModel('messages')
    private readonly messageModel: Model<IMessageModel>,
    private readonly chatsService: ChatsService,
    private readonly gptService: GptService,
  ) {
    super(messageModel);
  }

  // async create(createMessageDto: any): Promise<IMessageModel> {
  //   if (createMessageDto.content.type === 'text') {
  //     const createdEntity = new this.messageModel(createMessageDto);
  //     await createdEntity.save();
  //     let chat = await this.chatsService.findOne({
  //       _id: createMessageDto.chat_id,
  //     });
  //     if (chat) {
  //       if (!chat.last_thread) {
  //         const gpt_thread = await this.gptService.generateThreads({
  //           userName: chat?.user.name,
  //         });
  //         console.log('gpt_thread: ', gpt_thread);
  //         chat = await this.chatsService.update(chat._id.toString(), {
  //           last_thread: {
  //             id: gpt_thread.id,
  //             status: 'Free',
  //           },
  //         });
  //       }
  //       if (chat && chat.last_thread.status != 'Busy') {
  //         await this.chatsService.updateThread(chat._id.toString(), 'Busy');
  //         let response = await this.gptService.generateNewResponse(
  //           chat,
  //           createMessageDto.content.text,
  //         );
  //         await this.chatsService.updateThread(chat._id.toString(), 'Free');
  //         const responseAux: Partial<IMessageModel> = {
  //           user_id: createMessageDto.user_id || null,
  //           chat_id: createMessageDto.chat_id || null,
  //           direction: 'inbound',
  //           content: {
  //             type: 'text',
  //             text: response,
  //           },
  //         };
  //         const createdResponse = new this.messageModel(responseAux);
  //         await createdResponse.save();
  //         console.log(`MIKEROSS - ${JSON.stringify(response, null, 2)}`);
  //       } else {
  //         // TODO -> Analize what to do in this scenary
  //       }
  //       return createdEntity;
  //     }
  //     throw new Error('Chat not found');
  //   }
  //   throw new Error('Invalid message content type');
  // }

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
