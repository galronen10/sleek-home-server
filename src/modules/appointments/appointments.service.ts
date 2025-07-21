/*
https://docs.nestjs.com/providers#services
*/

import {
  Appointments,
  Doctors,
  IAppointmentDTO,
  IAppointmentForClient,
} from '@/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, Repository } from 'typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { generateTimeSlots } from '@/utils/date';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private readonly appointmentsRepository: Repository<Appointments>,
    private readonly doctorsService: DoctorsService,
  ) {}

  findAll(): Promise<Appointments[]> {
    return this.appointmentsRepository.find();
  }

  findById(id: number): Promise<Appointments | null> {
    return this.appointmentsRepository.findOneBy({ id });
  }

  async deleteById(id: number): Promise<void> {
    const deleteRes = await this.appointmentsRepository.delete(id);
    if (deleteRes.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }

  async getAvailableTimeSlotsByDateAndDoctor(
    doctorId: number,
    date: string,
  ): Promise<string[]> {
    const doctor: Doctors | null = await this.doctorsService.findById(doctorId);
    if (!doctor)
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await this.appointmentsRepository.find({
      select: {
        date: true,
      },
      where: {
        date: Between(startOfDay, endOfDay),
        doctor: Equal(doctorId),
      },
    });

    const existingSlots: Date[] = existingAppointments.map((appointment) =>
      toZonedTime(appointment.date, 'UTC'),
    );

    return generateTimeSlots(doctor.appointmentDuration, existingSlots, date);
  }

  async getByUserID(userId: number): Promise<IAppointmentForClient[]> {
    const appointments = await this.appointmentsRepository.find({
      where: { user: { id: userId } },
      relations: ['doctor', 'doctor.medicalField'],
    });

    return appointments.map((appointment) => {
      const { medicalField, ...doctorForClient } = appointment.doctor;
      return {
        id: appointment.id,
        date: appointment.date,
        doctor: doctorForClient,
        medicalField,
      };
    });
  }

  async create(appointmentDTO: IAppointmentDTO): Promise<Appointments> {
    const appointmentForDB: Appointments | null = await (appointmentDTO.id
      ? this.findById(appointmentDTO.id)
      : this.appointmentsRepository.create({
          doctor: { id: appointmentDTO.doctorId! },
          user: { id: appointmentDTO.userId! },
        }));

    if (!appointmentForDB) throw new Error('appointment not found');

    appointmentForDB.date = appointmentDTO.date;

    return this.appointmentsRepository.save(appointmentForDB);
  }
}
