import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { GptService } from './services/gpt.service';
import { UsersModule } from '../users/users.module';
import { ChatsModule } from '../chats/chats.module';

@Module({
  imports: [CommonModule, ChatsModule, UsersModule],
  providers: [GptService],
  exports: [GptService], // Ensure GptService is exported
})
export class GptModule {}
