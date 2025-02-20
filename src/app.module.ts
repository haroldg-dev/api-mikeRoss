import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongoDBModule } from './modules/database/mongoose.database';
import { HealthModule } from './modules/health/health.module';
import { ChatsModule } from './modules/chats/chats.module';
import { UsersModule } from './modules/users/users.module';
import { GptModule } from './modules/gpt/gpt.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    MongoDBModule,
    HealthModule,
    ChatsModule,
    UsersModule,
    MessagesModule,
  ]
})
export class AppModule {}
