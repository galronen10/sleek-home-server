/*
https://docs.nestjs.com/providers#services
*/

import { Doctors, MedicalFields } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalFieldsService {
  constructor(
    @InjectRepository(MedicalFields)
    private readonly medicalFieldRepository: Repository<MedicalFields>,
  ) {}

  findAll(): Promise<MedicalFields[]> {
    return this.medicalFieldRepository
      .createQueryBuilder('medicalField')
      .innerJoin(Doctors, 'doctor', 'doctor.medicalFieldId = medicalField.id')
      .distinct(true)
      .getMany();
  }
}
