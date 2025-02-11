import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'messages', schema: MessageSchema }]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService, MongooseModule],
})
export class MessagesModule {}
