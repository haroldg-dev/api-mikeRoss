import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { GptService } from './services/gpt.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CommonModule, UsersModule],
  providers: [GptService],
  exports: [GptService],
})
export class GptModule {}
