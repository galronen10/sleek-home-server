/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import {
  Appointments,
  IAppointmentDTO,
  IAppointmentForClient,
} from '@/entities';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  findAll(): Promise<Appointments[]> {
    return this.appointmentsService.findAll();
  }

  @Get('/availableTimeSlots/:doctorId/:date')
  getAvailableTimeSlotsByDateAndDoctor(
    @Param('doctorId') doctorId: number,
    @Param('date') date: string,
  ): Promise<string[]> {
    return this.appointmentsService.getAvailableTimeSlotsByDateAndDoctor(
      doctorId,
      date,
    );
  }

  @Get('/user/:userId')
  getByUserID(
    @Param('userId') userId: number,
  ): Promise<IAppointmentForClient[]> {
    return this.appointmentsService.getByUserID(userId);
  }

  @Post()
  create(@Body() appointmentDTO: IAppointmentDTO): Promise<Appointments> {
    return this.appointmentsService.create(appointmentDTO);
  }

  @Delete('/:id')
  @HttpCode(204) // No Content response
  async deleteAppointment(@Param('id') id: number): Promise<void> {
    await this.appointmentsService.deleteById(id);
  }
}
