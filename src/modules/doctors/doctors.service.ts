/*
https://docs.nestjs.com/providers#services
*/

import { Doctors } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctors)
    private readonly doctorRepository: Repository<Doctors>,
  ) {}

  findAll(): Promise<Doctors[]> {
    return this.doctorRepository.find();
  }

  findById(id: number): Promise<Doctors | null> {
    return this.doctorRepository.findOneBy({ id });
  }

  findByMedicalField(fieldId: number): Promise<Doctors[]> {
    return this.doctorRepository.findBy({ medicalField: Equal(fieldId) });
  }
}
