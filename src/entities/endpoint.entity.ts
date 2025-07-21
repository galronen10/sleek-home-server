import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Endpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  nextExpectedCallDate: Date;

  @Column()
  maliciousCount: number;

  @Column({ array: true })
  maliciousList: string[];
}

export interface IDetectDTO {
  endpointId: number;
  nextExpectedCallDate: Date;
}
