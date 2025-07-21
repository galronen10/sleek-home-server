/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MedicalFieldsController } from './medicalFields.controller';
import { MedicalFieldsService } from './medicalFields.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalFields } from '@/entities';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalFields])],
  controllers: [MedicalFieldsController],
  providers: [MedicalFieldsService],
})
export class MedicalFieldsModule {}
