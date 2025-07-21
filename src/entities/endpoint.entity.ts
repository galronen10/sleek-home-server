import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Endpoint {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'timestamptz' })
  nextExpectedCallDate: Date;

  @Column()
  maliciousCount: number;

  @Column('text', { array: true })
  maliciousList: string[];
}

export enum EEndpointStatus {
  stable = 'stable',
  unstable = 'unstable',
  inactive = 'inactive',
}

export interface IEndpointForClient {
  id: string;
  maliciousCount: number;
  status: EEndpointStatus;
}

export interface IDetectDTO {
  endpointId: number;
  nextExpectedCallDate: Date;
}
