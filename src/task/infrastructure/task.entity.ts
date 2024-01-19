import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ETaskType } from '../domain/enum/task.types';

@Entity()
export class TaskEntity {
  @PrimaryColumn()
  id: string;
  @Column({ nullable: true })
  description: string;
  @Column({ default: 'Zadanie', nullable: true })
  name: string;
  @Column({ default: 0 })
  defaultOrder: number;
  @Column('varchar', { default: 'default' })
  type: ETaskType;
  @Column('json', { default: {} })
  answer: any;
  @Column()
  gameId: string;
  @Column('simple-json', { nullable: true })
  body: any;
  @Column()
  cost: number;
  @Column()
  penalty: number;

  // @Column({ nullable: true })
  // fileAnswer: string;
}
