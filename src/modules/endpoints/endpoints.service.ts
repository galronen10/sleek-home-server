import {
  EEndpointStatus,
  Endpoint,
  IDetectDTO,
  IDetectRes,
  IEndpointForClient,
  MaliciousFile,
} from '@/entities';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { addHours, isBefore } from 'date-fns';
import { In, Repository } from 'typeorm';

const HOURS_FOR_INACTIVE: number = +(process.env.HOURS_FOR_INACTIVE ?? 24);

@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(Endpoint)
    private readonly endpointRepo: Repository<Endpoint>,
    @InjectRepository(MaliciousFile)
    private readonly maliciousFileRepo: Repository<MaliciousFile>,
    @InjectQueue('detect')
    private readonly detectQueue: Queue,
  ) {}

  async getAll(): Promise<IEndpointForClient[]> {
    const endpoints = await this.endpointRepo.find({
      select: ['id', 'maliciousCount', 'nextExpectedCallDate'],
    });

    const now = new Date();
    return endpoints.map((endpoint) => {
      let status: EEndpointStatus;

      if (isBefore(now, endpoint.nextExpectedCallDate))
        status = EEndpointStatus.stable;
      else if (
        isBefore(
          now,
          addHours(endpoint.nextExpectedCallDate, HOURS_FOR_INACTIVE),
        )
      )
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
    const endpoint: Endpoint | null = await this.endpointRepo.findOneBy({
      id,
    });

    return endpoint?.maliciousList ?? [];
  }

  async detectEndpointMaliciousLogic(
    detectDTO: IDetectDTO,
  ): Promise<IDetectRes> {
    const { endpointId, filesHashes, nextExpectedCallDate } = detectDTO;

    const maliciousRecords = await this.maliciousFileRepo.findBy({
      id: In(filesHashes),
    });

    const maliciousHashes = maliciousRecords.map((m) => m.id);

    let endpoint = await this.endpointRepo.findOneBy({ id: endpointId });

    if (!endpoint) {
      endpoint = this.endpointRepo.create({
        id: endpointId,
        nextExpectedCallDate,
        maliciousCount: maliciousHashes.length,
        maliciousList: maliciousHashes,
      });
    } else {
      endpoint.nextExpectedCallDate = nextExpectedCallDate;
      endpoint.maliciousCount = maliciousHashes.length;
      endpoint.maliciousList = maliciousHashes;
    }

    await this.endpointRepo.save(endpoint);

    return {
      maliciousFiles: maliciousHashes,
    };
  }

  async detectEndpointMalicious(detectDTO: IDetectDTO): Promise<IDetectRes> {
    try {
      return await this.detectEndpointMaliciousLogic(detectDTO);
    } catch (error) {
      console.error(
        'Error in detectEndpointMalicious. Sending to queue.',
        error,
      );
      await this.detectQueue.add('detect', detectDTO);
      return { maliciousFiles: [] };
    }
  }

  async seedMaliciousFiles(hashes: string[]): Promise<void> {
    const entities = hashes.map((hash) =>
      this.maliciousFileRepo.create({ id: hash }),
    );
    await this.maliciousFileRepo.save(entities);
  }
}
