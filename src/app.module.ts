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
import { pgConnectionConfig } from './pg.config';

console.log(pgConnectionConfig);
@Module({
  imports: [
    BullModule.forRoot({ connection: redisConfig }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(pgConnectionConfig),
    DetectQueueModule,
    EndpointsModule,
    DetectQueueConsumerModule,
  ],
})
export class AppModule {}
