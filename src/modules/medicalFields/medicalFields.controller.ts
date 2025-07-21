/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { MedicalFieldsService } from './medicalFields.service';
import { MedicalFields } from '@/entities';

@Controller('medicalFields')
export class MedicalFieldsController {
  constructor(private readonly medicalFieldsService: MedicalFieldsService) {}

  @Get()
  findAll(): Promise<MedicalFields[]> {
    return this.medicalFieldsService.findAll();
  }
}
