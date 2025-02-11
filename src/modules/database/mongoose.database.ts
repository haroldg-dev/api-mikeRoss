// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('MONGO_USER', '')}:${encodeURIComponent(configService.get<string>('MONGO_PASSWORD', ''))}@${configService.get<string>('MONGO_HOST', '')}/${configService.get<string>('MONGO_DBNAME', '')}?${configService.get<string>('MONGO_OPTIONS', '')}`,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongoDBModule {}
