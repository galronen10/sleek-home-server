import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MaliciousFile {
  @PrimaryGeneratedColumn()
  id: number;
}
