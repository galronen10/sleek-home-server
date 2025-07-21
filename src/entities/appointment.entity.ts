import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Doctors } from './doctor.entity';
import { Users } from './user.entity';
import { MedicalFields } from './medialField.entity';

@Entity()
export class Appointments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => Doctors)
  doctor: Doctors;

  @ManyToOne(() => Users)
  user: Users;
}

export interface IAppointmentDTO {
  id?: number;
  date: Date;
  doctorId?: number;
  userId?: number;
}

export interface IAppointmentForClient {
  id: number;
  date: Date;
  doctor: Omit<Doctors, 'medicalField'>;
  medicalField: MedicalFields;
}
