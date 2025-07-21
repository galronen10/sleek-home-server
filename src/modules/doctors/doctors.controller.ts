/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctors } from '@/entities';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll(): Promise<Doctors[]> {
    return this.doctorsService.findAll();
  }

  @Get('/byField/:medicalFieldId')
  findByMedicalFieldId(
    @Param('medicalFieldId') medicalFieldId: number,
  ): Promise<Doctors[]> {
    return this.doctorsService.findByMedicalField(medicalFieldId);
  }
}
