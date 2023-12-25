import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  text: string;
  @Column({ default: 0 })
  defaultOrder: number;
  @Column({ default: true })
  forceAnswer: boolean;
  @Column({ nullable: true })
  answer: string;
  @Column()
  gameId: string;
  @Column()
  cost: number;
  @Column()
  penalty: number;
  // @Column({ nullable: true })
  // fileAnswer: string;
}
