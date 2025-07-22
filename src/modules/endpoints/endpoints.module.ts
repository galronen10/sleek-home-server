import { EndpointsService } from './endpoints.service';
import { EndpointsController } from './endpoints.controller';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endpoint, MaliciousFile } from '@/entities';
import { DetectQueueModule } from '../queue';

@Module({
  imports: [
    TypeOrmModule.forFeature([Endpoint, MaliciousFile]),
    forwardRef(() => DetectQueueModule), // wrap here too if necessary
  ],
  controllers: [EndpointsController],
  providers: [EndpointsService],
  exports: [EndpointsService],
})
export class EndpointsModule {}
