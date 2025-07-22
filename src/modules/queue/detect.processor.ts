import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EndpointsService } from '../endpoints/endpoints.service';
import { IDetectDTO } from '@/entities';

@Processor('detect')
export class DetectProcessor extends WorkerHost {
  constructor(private readonly endpointsService: EndpointsService) {
    super();
  }

  async process(job: Job<IDetectDTO>) {
    try {
      await this.endpointsService.detectEndpointMaliciousLogic(job.data);
    } catch (err) {
      console.error('Failed processing detect job', err);
      throw err; // to trigger retry
    }
  }
}
