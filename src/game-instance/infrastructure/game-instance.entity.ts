import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity()
export class GameInstanceEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  gameId: string;
  @Column({nullable: true})
  endAt: Date;
  @Column({nullable: true})
  startedAt: Date;
  @Column()
  teamId: string;
  @Column({ default: 0 })
  score: number;
  @Column('varchar')
  status: string;
  @Column({ nullable: true })
  currentTaskId: string;
}
