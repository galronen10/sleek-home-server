import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class MaliciousFile {
  @PrimaryColumn()
  id: string;
}
