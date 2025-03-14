import { Module } from '@nestjs/common';
import { ChatsService } from './services/chats.service';
import { ChatsController } from './controllers/chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'chats', schema: ChatSchema }])],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService, MongooseModule], // Ensure ChatsService is exported
})
export class ChatsModule {}
