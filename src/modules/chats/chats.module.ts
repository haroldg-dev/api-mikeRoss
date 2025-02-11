import { Module } from '@nestjs/common';
import { ChatsController } from './controllers/chats.controller';
import { ChatsService } from './services/chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';
import { MessageSchema } from '../messages/schema/message.schema';
import { MessagesService } from '../messages/services/messages.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'chats', schema: ChatSchema },
      { name: 'messages', schema: MessageSchema },
    ]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService, MessagesService],
  exports: [ChatsService, MessagesService, MongooseModule],
})
export class ChatsModule {}
