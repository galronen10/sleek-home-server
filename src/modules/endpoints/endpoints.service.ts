import {
  EEndpointStatus,
  Endpoint,
  IDetectDTO,
  IEndpointForClient,
  MaliciousFile,
} from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addHours, isBefore } from 'date-fns';
import { Repository } from 'typeorm';

const HOURS_FOR_INACTIVE: number = +(process.env.HOURS_FOR_INACTIVE ?? 24);

interface trimEndpointWithStatus
  extends Pick<Endpoint, 'id' | 'maliciousCount'> {
  status: EEndpointStatus;
}
@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(Endpoint)
    private readonly endpointRepository: Repository<Endpoint>,
    @InjectRepository(MaliciousFile)
    private readonly maliciousFileRepository: Repository<MaliciousFile>,
  ) {}

  async getAll(): Promise<IEndpointForClient[]> {
    const endpoints = await this.endpointRepository.find({
      select: ['id', 'maliciousCount', 'nextExpectedCallDate'],
    });

    const now = new Date();
    const dateForInactive = addHours(now, HOURS_FOR_INACTIVE);

    return endpoints.map((endpoint) => {
      let status: EEndpointStatus;

      if (isBefore(endpoint.nextExpectedCallDate, now))
        status = EEndpointStatus.stable;
      else if (isBefore(endpoint.nextExpectedCallDate, dateForInactive))
        status = EEndpointStatus.unstable;
      else status = EEndpointStatus.inactive;

      return {
        id: endpoint.id,
        maliciousCount: endpoint.maliciousCount,
        status,
      };
    });
  }

  async getMaliciousList(id: string): Promise<string[]> {
    const endpoint: Endpoint | null = await this.endpointRepository.findOneBy({
      id,
    });

    return endpoint?.maliciousList ?? [];
  }

  async detectEndpointMalicious(detectDTO: IDetectDTO) {}
}
