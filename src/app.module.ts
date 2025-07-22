import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  DetectQueueConsumerModule,
  DetectQueueModule,
  EndpointsModule,
} from './modules';
import { BullModule } from '@nestjs/bullmq';
import { redisConfig } from './redis.config';

@Module({
  imports: [
    BullModule.forRoot({ connection: redisConfig }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    DetectQueueModule,
    EndpointsModule,
    DetectQueueConsumerModule,
  ],
})
export class AppModule {}
