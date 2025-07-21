import { Endpoint, IDetectDTO, MaliciousFile } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(Endpoint)
    private readonly endpointRepository: Repository<Endpoint>,
    @InjectRepository(MaliciousFile)
    private readonly maliciousFileRepository: Repository<MaliciousFile>,
  ) {}

  async getAll(): Promise<any[]> {
    return [];
  }

  async getMaliciousList(id: string): Promise<string[]> {
    return [];
  }

  async detectEndpointMalicious(detectDTO: IDetectDTO) {}
}
