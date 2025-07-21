import { EndpointsService } from './endpoints.service';
import { EndpointsController } from './endpoints.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endpoint, MaliciousFile } from '@/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Endpoint, MaliciousFile])],
  controllers: [EndpointsController],
  providers: [EndpointsService],
})
export class EndpointsModule {}
