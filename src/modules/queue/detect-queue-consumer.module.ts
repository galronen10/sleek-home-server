import { forwardRef, Module } from '@nestjs/common';
import { DetectQueueModule } from './detect-queue.module';
import { EndpointsModule } from '../endpoints/endpoints.module';
import { DetectProcessor } from './detect.processor';

@Module({
  imports: [
    DetectQueueModule,
    forwardRef(() => EndpointsModule), // wrap here too if necessary
  ],
  providers: [DetectProcessor],
})
export class DetectQueueConsumerModule {}
