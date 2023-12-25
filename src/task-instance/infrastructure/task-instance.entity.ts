import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TaskInstanceEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  taskId: string;
  @Column()
  gameInstanceId: string;
  @Column()
  order: number;
  @Column({ nullable: true })
  startedAt: Date;
  @Column({ nullable: true })
  answeredAt: Date;
  @Column({ nullable: true })
  answeredBy: string;
  @Column()
  status: string;
  @Column({ default: 0 })
  helpStatus: number;
}
