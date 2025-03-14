import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schema/message.schema';
import { ChatsModule } from '../chats/chats.module';
import { GptModule } from '../gpt/gpt.module'; // Import GptModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'messages', schema: MessageSchema }]),
    ChatsModule,
    GptModule, // Add GptModule here
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService, MongooseModule],
})
export class MessagesModule {}
