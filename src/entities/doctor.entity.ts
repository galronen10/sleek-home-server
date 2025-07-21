import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MedicalFields } from './medialField.entity';

@Entity()
export class Doctors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  appointmentDuration: number;

  @Column('int', { array: true })
  workingDays: number[];

  @Column()
  phone: string;

  @Column()
  isFemale: boolean;

  @Column()
  clinicName: string;

  @ManyToOne(() => MedicalFields, { onDelete: 'CASCADE' })
  medicalField: MedicalFields;
}
